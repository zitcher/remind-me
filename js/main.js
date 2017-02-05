$(document).ready(function() {
	var number;

  $("#submit-button").click(function() {
		number = $("#num").val();
		$(".main-ui").show();
	});

	$("#add-reminder").click(function() {
		var text = $("#reminder").val();
		var date = $("#date").val();
		var time = $("#time").val();
		//var newRem = new Reminder(text, date, time);
		$("#setReminder").submit(function() {
			$.ajax({
				type: 'POST',
				url: '/reminder',
				data: {number: number, text: text, date: date, time: time}
			});
			$(".main-ui").show();
			return false;
		});

		var table = document.getElementById("table");
		var newRow = table.insertRow(1);
		var tableText = newRow.insertCell(0);
		var tableTime = newRow.insertCell(1);
		tableText.innerHTML = text;
		tableTime.innerHTML = time + " " + date;
		document.getElementById("setReminder").reset();
	});
});
