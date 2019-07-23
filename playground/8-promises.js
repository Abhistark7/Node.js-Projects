const add = (a, b) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(a + b)
        }, 2000)
    })
}

add(1, 2).then((sum) => {
    console.log(sum)
    return add(sum, 5)
}).then((sum2) => {
    console.log(sum2)
}).catch((e) => {
    console.log(e)
})