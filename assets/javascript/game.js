$(document).ready(function () {

    //constructer to create fighter objects
    function fighter(name, image, hp, ap, cap, gp) {
        this.name = name;
        this.image = image;
        this.healthPoints = hp;
        this.attackPower = ap;
        this.counterAttackPower = cap;
        this.growth = gp;
        this.status = "enemy";

    }


    //this builds the tiles I'll be passing around
    function tileMaker(status, id, src, hp, ap, cp, gp) {
        var tile = $("<div>");
        var img = $("<img>");
        var bdy = $("<div>");
        var stats = $("<p>");
        tile.addClass("card fighter m-1 border border-primary");
        tile.addClass(status);
        tile.addClass(picked);
        tile.addClass(id);
        tile.attr("id", id);
        tile.css("background-image", src);
        img.attr("src", src);
        img.addClass("card-img-top");
        tile.append(img);
        bdy.addClass("card-body p-0");
        stats.addClass("card-text");
        stats.text(hp);
        stats.attr("id", id + "Hp");
        bdy.append(stats);
        tile.append(bdy);
        tile.attr("healthpoints", hp);
        tile.attr("attackPower", ap);
        tile.attr("counterAttack", cp);
        tile.attr("growth", gp);

        return tile;
    }

    //this will update the healthpoin attribute of the tiles.
    function hpUpDater(id) {

        $(id + "Hp").text($(id).attr("healthpoints"));
    }


    //this function finds out which tile is which and stores it's id into var id.
    function findId(name) {
        var id;
        if ($(name).hasClass("lukeSkywalker")) {
            // $("#lukeSkywalkerHp").text($("#lukeSkywalker").attr("healthpoints"));
            id = "#lukeSkywalker";
        }
        else if ($(name).hasClass("darthVader")) {
            id = "#darthVader";
        }
        else if ($(name).hasClass("hanSolo")) {
            id = "#hanSolo";
        }
        else if ($(name).hasClass("captainPhasma")) {
            id = "#captainPhasma";
        }
        return id;
    }
    //this guy adds the tiles to the character select area and initializes it.
    function gameSetUp(tile1, tile2, tile3, tile4) {
        $("#characterSelect").append(tile1);
        $("#characterSelect").append(tile2);
        $("#characterSelect").append(tile3);
        $("#characterSelect").append(tile4);
    }

    //this toggle's the invisible and visible bootstrap classes.
    function invisToggle(location) {
        $(location).toggleClass('visible invisible');
    }

    //this will set a thing to invis so the toggle will work right.
    function resetInvis(id) {
        $(id).addClass("invisible");
        $(id).removeClass("visible");
    }

    //this sets to visible for the toggle
    function resetVisible(id) {
        $(id).addClass("visible");
        $(id).removeClass("invisible");
    }

    //uses the contructor to make an object and then creates them into tiles. sets variables.
    var lukeSkywalker = new fighter("lukeSkywalker", "assets/images/luke.jfif", 100, 6, 5, 15);
    var darthVader = new fighter("darthVader", "assets/images/DarthVader.jfif", 200, 15, 20, 6);
    var hanSolo = new fighter("hanSolo", "assets/images/HanSolo.jfif", 80, 10, 8, 12);
    var captainPhasma = new fighter("captainPhasma", "assets/images/CaptainPhasma.jfif", 150, 12, 10, 10);
    var tile1 = tileMaker(lukeSkywalker.status, lukeSkywalker.name, lukeSkywalker.image, lukeSkywalker.healthPoints, lukeSkywalker.attackPower, lukeSkywalker.counterAttackPower, lukeSkywalker.growth);
    var tile2 = tileMaker(darthVader.status, darthVader.name, darthVader.image, darthVader.healthPoints, darthVader.attackPower, darthVader.counterAttackPower, darthVader.growth);
    var tile3 = tileMaker(hanSolo.status, hanSolo.name, hanSolo.image, hanSolo.healthPoints, hanSolo.attackPower, hanSolo.counterAttackPower, hanSolo.growth);
    var tile4 = tileMaker(captainPhasma.status, captainPhasma.name, captainPhasma.image, captainPhasma.healthPoints, captainPhasma.attackPower, captainPhasma.counterAttackPower, captainPhasma.growth);
    var picked = false;
    var defeatedCount = 0;
    gameSetUp(tile1, tile2, tile3, tile4);

    //function for first character you picked. then moves them to their locations.
    $("#characterSelect").delegate(".enemy", "click", function () {
        if (picked) {
            return 0;
        }
        else {
            console.log("clicked");
            $(this).toggleClass('border-primary border-success');
            $(this).toggleClass('enemy character');
            $(this).toggleClass('fighter picked')
            $(this).addClass('align-middle');
            $(".enemy").toggleClass('border-primary border-danger')
            $("#yourCharacter").append(this);
            $("#enemies").append($(".enemy"));
            $(".enemy").addClass('unpicked');
            picked = true;
            invisToggle("#directions2");
            invisToggle("#directions3");
            invisToggle("#boardRow");

        }

    });

    //lets you pick your opponent.
    $("#enemies").delegate(".unpicked", "click", function () {
        $("#yourOponent").append(this);
        $(this).toggleClass("unpicked yourOponent")
        $(".unpicked").toggleClass("unpicked waiting")
        $("#yourFighter").append($(".character"));
        invisToggle("#directions3");
        invisToggle("#directions1");
        invisToggle("#controlsRow");

        $("#infoBoardRow").removeClass("invisible");
    });

    // this works the attack button and does the math, also has the defeated condition and win condition nested in it.
    $("#attack").on("click", function () {
        yourHp = $(".character").attr("healthpoints");
        console.log(yourHp);
        enemyHp = $(".yourOponent").attr("healthpoints");
        console.log(enemyHp);
        yourAp = $(".character").attr("attackPower");
        console.log(yourAp);
        yourGrowth = $(".character").attr("growth");
        enemyCp = $(".yourOponent").attr("counterAttack");
        console.log(enemyCp);

        yourAp = parseInt(yourAp);
        yourGrowth = parseInt(yourGrowth);

        yourHp = yourHp - enemyCp;
        enemyHp = enemyHp - yourAp;
        console.log(enemyHp);
        console.log(yourHp);

        $(".character").attr("healthpoints", yourHp);
        $(".yourOponent").attr("healthpoints", enemyHp);


        var characterId = findId(".character");
        hpUpDater(characterId);

        var enemyId = findId(".yourOponent");
        hpUpDater(enemyId);

        $("#infoBoard").text(characterId + " hit " + enemyId + " for " + yourAp + " points of damage! " + enemyId + " retaliated for " + enemyCp + " points of damage!");

        yourAp = yourAp + yourGrowth;
        $(".character").attr("attackPower", yourAp);
        console.log(yourAp);
        //this one will check for draws.
        if (parseInt(enemyHp) <= 0 && parseInt(yourHp) <= 0) {
            $("#defeated").append($(".yourOponent"));
            $("#defeated").append($(".character"));
            $("#infoBoard").text("Draw " + characterId + " and " + enemyId + " defeated eachother. You failed to defeat all enemies!")
            invisToggle("#controlsRow");
        }
        //this one will check if you've beaten your opponent then move it to defeated row.
        else if (parseInt(enemyHp) <= 0) {
            defeatedCount++;
            $("#infoBoard").text("You defeated " + enemyId);
            $("#defeatedRow").removeClass("invisible");
            $("#defeated").append($(".yourOponent"));
            $(".yourOponent").toggleClass("yourOponent dead");
            $("#yourCharacter").append($(".character"));
            $(".waiting").toggleClass("unpicked waiting")
            invisToggle("#controlsRow");
            invisToggle("#directions1");
            invisToggle("#directions3");
            if (defeatedCount === 3) {
                $("#infoBoard").text("All enemies defeated!  You win!");
                invisToggle("#directions3");
            }
        }

        // this one is for if you lost.
        else if (parseInt(yourHp) <= 0) {
            $("#defeatedRow").removeClass("invisible");
            $("#defeated").append($(".character"));
            $(".character").toggleClass("character dead");
            $("#infoBoard").text(enemyId + " defeated you! You Lost!");
            invisToggle("#controlsRow");
        }

    });

    //this is suppose to reset program from wherever you are.
    $("#reset").on("click", function () {
        var tile1 = tileMaker(lukeSkywalker.status, lukeSkywalker.name, lukeSkywalker.image, lukeSkywalker.healthPoints, lukeSkywalker.attackPower, lukeSkywalker.counterAttackPower, lukeSkywalker.growth);
        var tile2 = tileMaker(darthVader.status, darthVader.name, darthVader.image, darthVader.healthPoints, darthVader.attackPower, darthVader.counterAttackPower, darthVader.growth);
        var tile3 = tileMaker(hanSolo.status, hanSolo.name, hanSolo.image, hanSolo.healthPoints, hanSolo.attackPower, hanSolo.counterAttackPower, hanSolo.growth);
        var tile4 = tileMaker(captainPhasma.status, captainPhasma.name, captainPhasma.image, captainPhasma.healthPoints, captainPhasma.attackPower, captainPhasma.counterAttackPower, captainPhasma.growth);

        picked = false;
        defeatedCount = 0;
        $("#yourCharacter, #enemies, #defeated, #yourFighter, #yourOpponent, #characterSelect ").empty();
        gameSetUp(tile1, tile2, tile3, tile4);
        resetVisible("#characterSelect");
        resetInvis("#directions1");
        resetVisible("#directions2");
        resetInvis("#directions3");
        resetInvis("#boardRow");
        resetInvis("#infoBoardRow");
        resetInvis("#controlsRow");
        resetInvis("#defeatedRow");
        $("#infoBoard").text("Click the attack button to hit your opponent");
    });








});