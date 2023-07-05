const reloadPageAfterSeconds = (miliseconds_to_go = 0) => {

    let timeout = setTimeout(() => {
        window.location.reload()
    }, miliseconds_to_go)

    return timeout
}

export {
    reloadPageAfterSeconds,
}