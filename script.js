var boxes = document.querySelectorAll(".box");
var resetbtn = document.querySelector("#reset-btn");
var player1 = true;
var user1 = prompt("Enter 1 Player Name", "Player 1");
var user2 = prompt("Enter 2 Player Name", "Player 2");

var winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
];

var audio1 = new Audio('/audio/bhupendra jogi.mpeg');
var audio2 = new Audio('/audio/elvish bhai.mpeg');
var audio3 = new Audio('/audio/ayein.mpeg');

var img1 = `<img src="/img/bhupendra jogi.png" alt="" style="width: 70px; height: 70px;">`;
var img2 = `<img src="/img/elvish bhai.png" alt="" style="width: 70px; height: 70px;">`;

boxes.forEach(function(box) {
    box.addEventListener('click', function() {
        if (player1) {
            box.innerHTML = img1;
            audio1.play();
            player1 = false;
        } else {
            box.innerHTML = img2;
            audio2.play();
            player1 = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

function checkWinner() {
    var draw = true;
    for (var patterns of winPatterns) {
        var pos1 = boxes[patterns[0]].innerHTML;
        var pos2 = boxes[patterns[1]].innerHTML;
        var pos3 = boxes[patterns[2]].innerHTML;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                draw = false;
                break;
            }
        } else {
            draw = false;
        }
    }
    if (draw) {
        setTimeout(function() {
            swal("Match Draw", "", "error");
            audio3.play();
            disableBoxes();
        }, 1000);
    }
};

function showWinner(win) {
    if (img1 === win) {
        swal("Congratulations", `The winner is ${user1}`, "success");
    } else {
        swal("Congratulations", `The winner is ${user2}`, "success");
    }
    disableBoxes();
};

function disableBoxes() {
    for (var box of boxes) {
        box.disabled = true;
    }
}

function resetGame() {
    player1 = true;
    enableBoxes();
}

function enableBoxes() {
    for (var box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
}

resetbtn.addEventListener("click", resetGame);
