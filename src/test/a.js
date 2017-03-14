// promise chain 
// test the error flow, successful

function b () {
    return new Promise(function(resolve, reject) {
        throw new Error('hello world');
    })
}

function a () {
    return new Promise(function(resolve, reject) {
        resolve(1);
        // throw new Error('hello');
    })
}

a().then(data => {
    console.log(data)
    return b();
}).catch(e => {
    console.log(e);
});