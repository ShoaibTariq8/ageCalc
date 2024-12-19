function age() {
    // Get input values
    const dateInput = document.getElementById('date');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const ageDisplay = document.getElementById('age');

    // Clear previous results
    ageDisplay.innerHTML = '';

    // Parse inputs
    const day = parseInt(dateInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    // Validation array with funny remarks
    const validationChecks = [
        {
            condition: isNaN(day) || isNaN(month) || isNaN(year),
            message: "Oops! Are you trying to calculate age with ghost numbers? 👻 Enter real digits!"
        },
        {
            condition: day < 1 || day > 31,
            message: "Nice try, time traveler! Days go from 1 to 31. No secret 32nd day exists! 🕰️"
        },
        {
            condition: month < 1 || month > 12,
            message: "Months of the year are 1 to 12. Did you invent a new calendar? 🗓️"
        },
        {
            condition: year < 1900 || year > new Date().getFullYear(),
            message: "Are you from the dinosaur era or the future? Enter a valid year between 1900 and now! 🦖🚀"
        },
        {
            condition: (month === 2 && day > 29),
            message: "February doesn't have that many days! Even in a leap year, it's max 29. 🤨"
        }
    ];

    // Check validations
    for (let check of validationChecks) {
        if (check.condition) {
            ageDisplay.innerHTML = `
                <p style="color: red; font-weight: bold;">
                    ${check.message}
                </p>
            `;
            return;
        }
    }

    // Additional date validity check
    try {
        const inputDate = new Date(year, month - 1, day);
        if (inputDate.getMonth() !== month - 1) {
            ageDisplay.innerHTML = `
                <p style="color: red; font-weight: bold;">
                    Invalid date! Maybe that day doesn't exist? 🤔
                </p>
            `;
            return;
        }
    } catch (error) {
        ageDisplay.innerHTML = `
            <p style="color: red; font-weight: bold;">
                Something went wrong with your date. Are you sure it's real? 🤨
            </p>
        `;
        return;
    }

    // Calculate age
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    // Precise age calculation
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust calculations
    if (days < 0) {
        months--;
        // Get the last day of the previous month
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Funny age remarks
    const ageRemarks = [
        { max: 0, remark: "You're literally a newborn! Welcome to planet Earth! 👶" },
        { max: 5, remark: "Adorable toddler stage! Terrible twos or terrific fives? 🧒" },
        { max: 12, remark: "Cool kid alert! Enjoy those awesome childhood years! 🚲" },
        { max: 18, remark: "Teenage drama incoming! Buckle up for the roller coaster! 🎢" },
        { max: 25, remark: "Young adult vibes! The world is your oyster! 🌟" },
        { max: 35, remark: "Adulting like a pro! Responsibilities and fun balanced! 💼" },
        { max: 50, remark: "Midlife wisdom activated! You've seen some things! 🧠" },
        { max: 65, remark: "Retirement goals! Time to enjoy life's greatest hits! 🏖️" },
        { max: 100, remark: "Living legend! You're basically a time-traveling superhero! 🦸" },
        { max: Infinity, remark: "Wow, you're defying the laws of aging! Teach us your secret! 🌈" }
    ];

    // Find appropriate remark
    const remark = ageRemarks.find(r => years <= r.max).remark;

    // Construct age string with conditional pluralization
    let ageString = '';
    if (years > 0) {
        ageString += `${years} year${years !== 1 ? 's' : ''} `;
    }
    if (months > 0) {
        ageString += `${months} month${months !== 1 ? 's' : ''} `;
    }
    if (days > 0) {
        ageString += `${days} day${days !== 1 ? 's' : ''}`;
    }

    // Display age and remark
    ageDisplay.innerHTML = `
        <p>
            You are ${ageString.trim()} old! 🎂
        </p>
        <p>
            ${remark}
        </p>
    `;
}