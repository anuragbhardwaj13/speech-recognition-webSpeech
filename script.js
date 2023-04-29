let recognition
let recognizing = false

if ('webkitSpeechRecognition' in window) {
	recognition = new webkitSpeechRecognition()
	recognition.continuous = true
	recognition.interimResults = true //this is for interim results, if i take break then it will show what have i said till npw
	recognition.maxAlternatives = 1

	recognition.onstart = function () {
		recognizing = true
	}

	recognition.onend = function () {
		recognizing = false
	}

	recognition.onresult = function (event) {
		let result = event.results[event.results.length - 1]
		if (result.isFinal) {
			document.getElementById('result-text').value = result[0].transcript
		}
	}
} else {
	console.log('Web Speech API is not supported on this browser.')
}

document.getElementById('start-btn').addEventListener('click', () => {
	if (recognizing) {
		recognition.stop()
		document.getElementById('start-btn').innerText =
			'Start Speech Recognition'
	} else {
		recognition.start()
		document.getElementById('start-btn').innerText =
			'Stop Speech Recognition'
	}
})
