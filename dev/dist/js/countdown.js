console.clear();

function CountdownTracker(label, value) {
	var element = document.createElement("span");

	element.className = "flip-clock__piece";
	element.innerHTML =
		'<b class="flip-clock__card card__"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>' +
		'<span class="flip-clock__slot">' +
		label +
		"</span>";

	this.element = element;

	var top = element.querySelector(".card__top"),
		bottom = element.querySelector(".card__bottom"),
		back = element.querySelector(".card__back"),
		backBottom = element.querySelector(".card__back .card__bottom");

	this.update = function (val) {
		val = ("0" + val).slice(-2);
		if (val !== this.currentValue) {
			if (this.currentValue >= 0) {
				back.setAttribute("data-value", this.currentValue);
				bottom.setAttribute("data-value", this.currentValue);
			}
			this.currentValue = val;
			top.innerText = this.currentValue;
			backBottom.setAttribute("data-value", this.currentValue);

			this.element.classList.remove("flip");
			void this.element.offsetWidth;
			this.element.classList.add("flip");
		}
	};

	this.update(value);
}

// Calculation adapted from https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/

function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	return {
		Total: t,
		Hari: Math.floor(t / (1000 * 60 * 60 * 24)),
		Jam: Math.floor((t / (1000 * 60 * 60)) % 24),
		Menit: Math.floor((t / 1000 / 60) % 60),
		Detik: Math.floor((t / 1000) % 60),
	};
}

function getTime() {
	var t = new Date();
	return {
		Total: t,
		Hours: t.getHours() % 12,
		Minutes: t.getMinutes(),
		Seconds: t.getSeconds(),
	};
}

function Clock(countdown, callback) {
	countdown = countdown ? new Date(Date.parse(countdown)) : false;
	callback = callback || function () {};

	var updateFn = countdown ? getTimeRemaining : getTime;

	this.element = document.createElement("div");
	this.element.className = "flip-clock";

	var trackers = {},
		t = updateFn(countdown),
		key,
		timeinterval;

	for (key in t) {
		if (key === "Total") {
			continue;
		}
		trackers[key] = new CountdownTracker(key, t[key]);
		this.element.appendChild(trackers[key].element);
	}

	var i = 0;
	function updateClock() {
		timeinterval = requestAnimationFrame(updateClock);

		// throttle so it's not constantly updating the time.
		if (i++ % 10) {
			return;
		}

		var t = updateFn(countdown);
		if (t.Total < 0) {
			cancelAnimationFrame(timeinterval);
			for (key in trackers) {
				trackers[key].update(0);
			}
			callback();
			return;
		}

		for (key in trackers) {
			trackers[key].update(t[key]);
		}
	}

	setTimeout(updateClock, 500);
}

const cD = document.querySelector('.countdown')
const targetDay = 30;
const targetMonth = 11; // Note: Months are 0-indexed, so January is 0, February is 1, and so on.
const targetYear = 2023;
const targetHour = 10;

const acara = new Date(targetYear, targetMonth, targetDay, targetHour, 0, 0);
const funCD = new Clock(acara)
cD.appendChild(funCD.element);