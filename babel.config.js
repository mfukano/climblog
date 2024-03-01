module.exports = api => {
    const platform = api.caller(caller && caller.platform);

    return {
        presets: ['babel-preset-expo'],
    }
}