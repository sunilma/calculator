$(document).ready(function(){
	var digits = "" ;
	var num = [];


	function calc(x, y, opt){
		var total;
		switch (opt){
			case "+":
			total = x+y;
			break;

			case "-":
			total = x-y;
			break;

			case "/":
			total = x/y;
			break;

			case "x":
			total = x*y;
			break;
		}
		if (total%1 !== 0){
			total = total.toFixed(2);
		}
		
		return total;
	}


	$("button").click(function(){
		var value = $(this).attr("value");

		if (value == "a"){
			digits = "";
			num = [];
			$("#display #data").html(0);
		} else if (value == "="){
			
			if (digits != ""){
				num.push(parseFloat(digits));
				while (num.length != 1){
					console.log(num);
					var total = parseFloat(num.shift());
					var operator = num.shift();
					var operand2 = parseFloat(num.shift());

					var bdmas = false;
					while(bdmas != true){
						if ((operator == "-" || operator == "+") && num.length>1){
							var tempopt = num.shift();
							if (tempopt == "x" || tempopt == "/"){
								var temp = num.shift();
								operand2 = calc(operand2, temp, tempopt);
							} else {
								num.unshift(tempopt);
								bdmas = true;
							}
						} else {
							bdmas = true;
						}
					}

					total = calc(total, operand2, operator);
					num.unshift(total);
				}
				$("#display #data").html(num[0]);
				digits = "";
				digits += num.shift();
			}
		}else {
			switch (value){
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
				

				digits += value;
				$("#display #data").html(digits);
				break;

				case '+':
				case '-':
				case 'x':
				case '/':
				if (digits != ""){
					num.push(parseFloat(digits));
					num.push(value);
					digits = "";
					$("#display #data").html(value);
				}
				break;

				case '.':
				if (digits.indexOf(".") == -1){
					digits += ".";
				}
				break;

			}
		}
	});
});