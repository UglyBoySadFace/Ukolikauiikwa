function solveExpression() {
  var postFix = "";
  var stack = [];
  var vyraz = document.getElementById("vyraz").value;
  for (var a = 0; a < vyraz.length; a++) {
    if (!isNaN(vyraz[a])) {
      postFix += vyraz[a];
      console.log(postFix);
    }
    if (
      vyraz[a] === "+" ||
      vyraz[a] === "-" ||
      vyraz[a] === "/" ||
      vyraz[a] === "*"
    ) {
      postFix += " ";
      if (porovnej(stack[stack.length - 1]) == 2) {
        console.log("here");
        postFix += stack.pop() + " ";
      }
      if (stack.length == 1 && porovnej(vyraz[a]) == 1) {
        postFix += stack.pop() + " ";
        stack.push(vyraz[a]);
      }

      if (porovnej(vyraz[a]) == 2) {
        stack.push(vyraz[a]);
      }
      if (stack.length == 0 && porovnej(vyraz[a]) == 1) {
        stack.push(vyraz[a]);
      }
    }
  }
  while (stack.length != 1) {
    postFix += stack.pop() + " ";
  }
  return (postFix += " " + stack.pop());
}
function porovnej(str) {
  switch (str) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    default:
      return 0;
  }
}
function solvePostfix(postfix) {
  var resultStack = [];
  postfix = postfix.split(" ");
  for (var i = 0; i < postfix.length; i++) {
    if (!isNaN(postfix[i])) {
      resultStack.push(postfix[i]);
    } else {
      var a = resultStack.pop();
      var b = resultStack.pop();
      if (postfix[i] === "+") {
        resultStack.push(parseInt(a) + parseInt(b));
      } else if (postfix[i] === "-") {
        resultStack.push(parseInt(b) - parseInt(a));
      } else if (postfix[i] === "*") {
        resultStack.push(parseInt(a) * parseInt(b));
      } else if (postfix[i] === "/") {
        resultStack.push(parseInt(b) / parseInt(a));
      }
    }
  }
  if (resultStack.length > 1) {
    return "error";
  } else {
    return resultStack.pop();
  }
}
var input = document.getElementById("vyraz");
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    var a = solvePostfix(solveExpression());
    var s = isNaN(a);
    console.log(s);
    if (!s) {
      document.getElementById("vysledek").innerHTML = "Vysledek je:" + a;
    } else {
      document.getElementById("vysledek").innerHTML = "nerozumím ";
    }
  }
});
