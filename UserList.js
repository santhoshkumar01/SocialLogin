import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'


export default UserList = () => {
    const [userData, setUserData] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [paginationLoader, setPaginationLoader] = useState(false)
    const [noDataLoadMore, setNoDataLoadMore] = useState(false)
    const URL = `https://reqres.in/api/users?page=${pageNo}`

    const loadMoreData = async () => {
        setNoDataLoadMore(true)
        setPaginationLoader(true)
        setPageNo(pageNo + 1)
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                if (data && data.data.length > 0) {
                    setUserData(userData.concat(data.data))
                    setPaginationLoader(false)
                } else {
                    setPaginationLoader(false)
                    setNoDataLoadMore(false)
                }
            })
            .catch(error => {
                setPaginationLoader(false)
                console.error('Paginate Users List Error', error)
            })
    }
    useEffect(() => {
        (async () => {
            fetch(URL)
                .then(response => response.json())
                .then(data => {
                    setUserData(data.data)
                })
                .catch(error => console.error('Users List Error', error))
        })()
    }, [])

    return (
        <View style={styles.container}>
            {userData && userData.length > 0 ? <FlatList
                data={userData}
                renderItem={({ item, index }) => {
                    return (
                        <View key={index} style={styles.userDetailCard}>
                            <Text style={styles.fullName}>{item?.first_name} {item?.last_name}</Text>
                            <Text style={styles.email}>{item?.email}</Text>
                        </View>
                    )
                }}
                keyExtractor={(_, index) => String(index)}
                onEndReached={() => loadMoreData()}
                onEndThreshold={0}
                ListFooterComponent={() => {
                    return (
                        <>
                            {noDataLoadMore && paginationLoader && <View style={styles.paginateLoaderView}>
                                <ActivityIndicator color="#375C8C" size="large" />
                            </View>
                            }
                        </>
                    )
                }}
            />
                :
                <View style={styles.noDataView}>
                    <Text style={styles.noData}>No Data Available</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: '5%',
        paddingBottom: '5%'
    },
    userDetailCard: {
        height: 130,
        borderBottomWidth: 1,
        width: '95%',
        alignSelf: 'center'
    },
    fullName: {
        fontSize: 20,
        margin: 5
    },
    email: {
        margin: 5,
        marginTop: '8%',
        fontSize: 24,
        fontWeight: 'bold'
    },
    noDataView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noData: {
        fontSize: 24,
        textAlign: 'center'
    },
    paginateLoaderView: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
})