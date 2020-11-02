const assert = require("chai").assert;

const database = {
    621: { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631]},
    123: { id: 123, name: "FriendNo1", friends: [621, 631] },
    251: { id: 251, name: "SecondBestFriend", friends: [621] },
    631: { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] }
};

const getUser = id => new Promise((res, rej) => {
    setTimeout(() => {
        database[id] ? res(database[id]) : rej(new Error("not_found"))
    }, 300);
});

const expected = [
    { id: 621, name: "XxDragonSlayerxX", friends: [
        { id: 123, name: "FriendNo1", friends: [621, 631] },
        { id: 251, name: "SecondBestFriend", friends: [621] },
        { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] }
    ] },
    { id: 123, name: "FriendNo1", friends: [
        { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] },
        { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] }
    ] },
    { id: 251, name: "SecondBestFriend", friends: [
        { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] }
    ] },
    { id: 631, name: "ThirdWh33l", friends: [
        { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] },
        { id: 123, name: "FriendNo1", friends: [621, 631] },
        { id: 251, name: "SecondBestFriend", friends: [621] },
    ] },
];

const validate = (result) => {
    try {
        result.forEach(function(actualResult) {
            let expResult = expected.filter(expUser => expUser.id === actualResult.id).pop();
            assert.deepEqual(actualResult, expResult);
        });
    } catch (e) {
        console.error("Failed", e);
    }
};

async function populateFriendsInfo(id) {
    return getUser(id).then(function(user) {        
       const userData = { ...user }
       let friendsInfoPromises = user.friends.map(fid => getUser(fid));
        return Promise.all(friendsInfoPromises).then(function(info) {
            userData.friends = info;
            return userData;
        }).catch(err => console.log(err));
    });
}

async function populateData() {
    let resPromises = [];
    Object.keys(database).forEach(function (key) {
        resPromises.push(populateFriendsInfo(key));
    });
    let data = await Promise.all(resPromises);
    return data;
}

// implement a method to create this result
let result = [];
// At the end call validate
populateData().then(function(data) {
    result = data;
    validate(result);
}).catch(err => console.log(err));;
