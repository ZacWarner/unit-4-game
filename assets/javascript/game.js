$(document).ready(function () {

    //constructer to create fighter objects
    function fighter(name, image, hp, ap, cap) {
        this.name = name;
        this.image = image;
        this.healthPoints = hp;
        this.attackPower = ap;
        this.counterAttackPower = cap;
        this.status = "enemy";

    }

    function tileMaker(status, id, src) {
        var tile = $("<img>");
        tile.addClass("img fighter m-1 border border-success");
        tile.addClass(status);
        tile.addClass(picked);
        tile.attr("id", id);
        tile.attr("src", src);
        return tile;
    }

    function gameSetUp(tile1, tile2, tile3, tile4) {
        $("#characterSelect").append(tile1);
        $("#characterSelect").append(tile2);
        $("#characterSelect").append(tile3);
        $("#characterSelect").append(tile4);
    }

    function invisToggle(location) {
        $(location).toggleClass('visible invisible');
    }

    var lukeSkywalker = new fighter("lukeSkywalker", "assets/images/luke.jfif", 100, 100, 100);
    var darthVader = new fighter("darthVader", "assets/images/DarthVader.jfif", 100, 100, 100);
    var hanSolo = new fighter("hanSolo", "assets/images/HanSolo.jfif", 100, 100, 100);
    var captainPhasma = new fighter("captainPhasma", "assets/images/CaptainPhasma.jfif", 100, 100, 100);
    var tile1 = tileMaker(lukeSkywalker.status, lukeSkywalker.name, lukeSkywalker.image);
    var tile2 = tileMaker(darthVader.status, darthVader.name, darthVader.image);
    var tile3 = tileMaker(hanSolo.status, hanSolo.name, hanSolo.image);
    var tile4 = tileMaker(captainPhasma.status, captainPhasma.name, captainPhasma.image);
    var picked = false;
    gameSetUp(tile1, tile2, tile3, tile4);


    $(".fighter").on("click", function () {
        if (picked) {
            return 0;
        }
        else {
            console.log("clicked");
            $(this).toggleClass('border-success border-danger');
            $(this).toggleClass('enemy character');
            $(this).toggleClass('fighter picked')
            $(this).addClass('align-middle');
            $("#yourCharacter").append(this);
            $("#enemies").append($(".enemy"));
            $(".enemy").addClass('unpicked');
            picked = true;
            invisToggle("#directions2");
            invisToggle("#directions3");
            invisToggle("#boardRow");
        }

    });

    $(".unpicked").on("click", function () {
        $("#yourOponent").append(this);
        $("#yourFighter").append($(".character"));
    });

    $("#reset").on("click", function () {
        tile1 = tileMaker(lukeSkywalker.status, lukeSkywalker.name, lukeSkywalker.image);
        tile2 = tileMaker(darthVader.status, darthVader.name, darthVader.image);
        tile3 = tileMaker(hanSolo.status, hanSolo.name, hanSolo.image);
        tile4 = tileMaker(captainPhasma.status, captainPhasma.name, captainPhasma.image);
        picked = false;
        gameSetUp(tile1, tile2, tile3, tile4);
        invisToggle("#directions2");
        invisToggle("#directions3");
        invisToggle("#boardRow");

        $("#yourCharacter, #enemies").empty();
    });








});