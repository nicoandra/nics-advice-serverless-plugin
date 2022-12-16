

const IGNORE = 'IGNORE'
const SUGGEST = 'SUGGEST'
const REQUIRE = 'REQUIRE'

const adviceLevels = [IGNORE, SUGGEST, REQUIRE]

class Advice {
    constructor(adviceName, adviceDescription, requestedAdviceLevel, shouldReportAdvice) {
        this.adviceName = adviceName
        this.adviceDescription = adviceDescription
        this.requestedAdviceLevel = adviceLevels.indexOf(requestedAdviceLevel.toUpperCase())
        this.shouldReportAdvice = shouldReportAdvice
    }

    run() {
       if (!this.shouldReportAdvice || this.requestedAdviceLevel == adviceLevels.indexOf(IGNORE)) {
            return
        }

        if (this.requestedAdviceLevel == adviceLevels.indexOf(SUGGEST)) {
            console.warn(`[Good Advice: ${this.adviceName}]: ${this.adviceDescription}`);
            return ;
        }

        console.error(`[Good Advice: ${this.adviceName}]: ${this.adviceDescription}. HALTING.`);
    }
}

module.exports = Advice