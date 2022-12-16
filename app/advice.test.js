const Advice = require('./advice')


test('Creates an instance', () => {
    expect(new Advice('AdviseTitle', 'AdviseDescription', 'IGNORE', true)).toBeTruthy()
    expect(new Advice('AdviseTitle', 'AdviseDescription', 'IGNORE', true)).toBeTruthy()

})

test('Logs a warning when advice level is SUGGESTED', () => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
    const err = jest.spyOn(console, "error").mockImplementation(() => {});

    const advice = new Advice('AdviseTitle', 'AdviseDescription', 'SUGGEST', true);

    expect(advice).toBeTruthy()
    advice.run()
    expect(warn).toBeCalled();
    expect(err.mock.calls.length).toBe(0)
    err.mockReset()
    warn.mockReset()
})


test('Logs an error when advice level is REQUIRE', () => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
    const err = jest.spyOn(console, "error").mockImplementation(() => {});

    const advice = new Advice('AdviseTitle', 'AdviseDescription', 'REQUIRE', true);

    expect(advice).toBeTruthy()
    advice.run()
    expect(err).toBeCalled();
    expect(warn.mock.calls.length).toBe(0)
    err.mockReset()
    warn.mockReset()    
})