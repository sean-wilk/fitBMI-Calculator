$(document).on('click', '.bmi-calc-unit .btn-group button', function (e) {
    //Set active button
    $(".active").not($(this).addClass('active')).removeClass();

    //Get data group for button
    var btn = e.currentTarget;
    var btnGroup = btn.getAttribute('data-group');
    $('#btn-calculate').data('unit',btnGroup);
    $('#btn-calculate').attr('data-unit',btnGroup);

    //Show relevant inputs for units
    if (btnGroup == "metric") {
      $('#bmi-imperial').fadeOut('fast', function(){
          $('#bmi-metric').fadeIn('fast');
      });
    } else {
      $('#bmi-metric').fadeOut('fast', function(){
          $('#bmi-imperial').fadeIn('fast');
      });
    }
});

$(document).on('click', '#btn-calculate.calculate', function (e) {
      //Changing button to a Reset Button & Showing Results
      $('#btn-calculate').removeClass('calculate');
      $('#btn-calculate').addClass('reset');
      $('#btn-calculate').attr('value','Reset');
      $('#bmi-result').fadeIn('slow');
      $('html, body').animate({
          scrollTop: ($('#bmi-result').offset().top)
      },500);

    //Get BMI unit
    var bmiUnits = $('#btn-calculate').data('unit');

    //Get imperial units
    var heightFt = parseInt($('#height-ft-input').val(), 10);
    var heightIn = parseInt($('#height-in-input').val(), 10);
    var heightImperial = parseInt((heightFt * 12) + heightIn,10);
    var weightImperial = parseInt($('#weight-lb-input').val(), 10);

    //Get metric units
    var heightCm = parseInt($('#height-cm-input').val(), 10);
    var heightMetric = heightCm/100;
    var weightMetric = parseInt($('#weight-kg-input').val(), 10);

    //Calculate BMI Score
    if (bmiUnits == "metric") {
      bmiResult = weightMetric / (heightMetric * heightMetric);
    } else {
      bmiResult = (weightImperial / (heightImperial * heightImperial)) * 703;
    }

    bmiOutput = round(bmiResult,1);
    //Display bmiOutput in Title
    $('#result-output').html(bmiOutput);

    //Calculate BMI Rating & set span class
    var bmiRating = "";
    if (bmiOutput< 18.5) {
      bmiRating = "underweight";
      $('#bmi-rank').addClass('rank-underweight');
      $('.accordian-underweight, .accordian-underweight .bmi-accordion-header').addClass('active');
    } else if (bmiOutput >= 18.5 && bmiOutput < 25) {
      bmiRating = "normal";
      $('#bmi-rank').addClass('rank-normal');
      $('.accordian-normal,.accordian-normal .bmi-accordion-header').addClass('active');
    } else if (bmiOutput >= 25 && bmiOutput < 30) {
      bmiRating = "overweight";
      $('#bmi-rank').addClass('rank-overweight');
      $('.accordian-overweight, .accordian-overweight .bmi-accordion-header').addClass('active');
    } else if (bmiOutput >= 30) {
      bmiRating = "obese";
      $('#bmi-rank').addClass('rank-obese');
      $('.accordian-obese, .accordian-obese .bmi-accordion-header').addClass('active');
    } else {
      bmiRating = "not calculated";
      $('#bmi-rank').addClass('rank-obese');
    }

    //Display BMI Rating
    $('#bmi-rank').html(bmiRating);

    //Position Hovering Box with BMI

    hoverBox = '<div id="hover-box">' + bmiOutput.toString() + '</div>';
    var itemNumber = 0;
    var roundedNumber = (bmiResult - 14) * 2;

    /* Generate Hover Box */
    if (bmiOutput < 15) {
      /* Item number is one for all outputs below 15 */
      itemNumber = 1;
      /* Add Hover HTML */
      hoverBox = '<div id="hover-box" class="rank-below-chart"> <15 </div>';
      /* Generate Parent ID */
      hoverBoxParent = '#item' + itemNumber.toString();
      /* Insert hoverBox HTML */
      $(hoverBoxParent).html(hoverBox);

    } else if (bmiOutput <= 15 && bmiOutput < 18.5) {
      /* Calculting item number */
      itemNumber = itemNumber = round(roundedNumber,0);
      /* Add Hover HTML */
      hoverBox = '<div id="hover-box" class="rank-underweight">' + bmiOutput.toString() + '</div>';
      /* Generate Parent ID */
      hoverBoxParent = '#item' + itemNumber.toString();
      /* Insert hoverBox HTML */
      $(hoverBoxParent).html(hoverBox);

    } else if (bmiOutput >= 18.5 && bmiOutput < 25) {
      /* Calculting item number */
      itemNumber = itemNumber = round(roundedNumber,0);
      /* Add Hover HTML */
      hoverBox = '<div id="hover-box" class="rank-normal">' + bmiOutput.toString() + '</div>';
      /* Generate Parent ID */
      hoverBoxParent = '#item' + itemNumber.toString();
      /* Insert hoverBox HTML */
      $(hoverBoxParent).html(hoverBox);

    } else if (bmiOutput >= 25 && bmiOutput < 30) {
      /* Calculting item number */
      itemNumber = itemNumber = round(roundedNumber,0);
      /* Add Hover HTML */
      hoverBox = '<div id="hover-box" class="rank-overweight">' + bmiOutput.toString() + '</div>';
      /* Generate Parent ID */
      hoverBoxParent = '#item' + itemNumber.toString();
      /* Insert hoverBox HTML */
      $(hoverBoxParent).html(hoverBox);

    } else if (bmiOutput >= 30 && bmiOutput < 45) {
      /* Calculting item number */
      itemNumber = itemNumber = round(roundedNumber,0);
      /* Add Hover HTML */
      hoverBox = '<div id="hover-box" class="rank-obese">' + bmiOutput.toString() + '</div>';
      /* Generate Parent ID */
      hoverBoxParent = '#item' + itemNumber.toString();
      /* Insert hoverBox HTML */
      $(hoverBoxParent).html(hoverBox);

    } else if (bmiOutput >= 45) {
      /* Item number is one for all outputs above 45 */
      itemNumber = 62;
      /* Add Hover HTML */
      hoverBox = '<div id="hover-box" class="rank-above-chart"> >45 </div>';
      /* Generate Parent ID */
      hoverBoxParent = '#item' + itemNumber.toString();
      /* Insert hoverBox HTML */
      $(hoverBoxParent).html(hoverBox);
    }

    /* Insert hoverBox HTML */
    $(hoverBoxParent).html(hoverBox);

    /* Insert hoverBox CSS */
    if($(window).width() >= 769) {
      $(hoverBoxParent).css({'height': '34px','margin-bottom': '8px', 'border-radius': '0 0 4px 4px'});
    } else {
      $(hoverBoxParent).css({'height': '56px','margin-bottom': '8px', 'border-radius': '0 0 4px 4px'});
    }

    //BMI calculation

    var calculationAmount = 0;
    var calculationText = '';

    if (bmiOutput < 18.5) {
      $('#bmi-calc-direction').html("gain");
      if (bmiUnits == "metric") {
        calculationAmount = (18.5 - bmiResult) * heightMetric * heightMetric;
        calculationAmountRounded = round(calculationAmount,1);
        calculationText = calculationAmountRounded.toString() + ' kilograms';
        $('#bmi-calc-amount').html(calculationText);
      } else {
        calculationAmount = ((18.5 - bmiResult) * heightImperial * heightImperial)/703;
        calculationAmountRounded = round(calculationAmount,1);
        calculationText = calculationAmountRounded.toString() + ' pounds';
        $('#bmi-calc-amount').html(calculationText);
      }
    } else if (bmiOutput > 25) {
      $('#bmi-calc-direction').html("lose");
      if (bmiUnits == "metric") {
        calculationAmount = (bmiResult - 25) * heightMetric * heightMetric;
        calculationAmountRounded = round(calculationAmount,1);
        calculationText = calculationAmountRounded.toString() + ' kilograms';
        $('#bmi-calc-amount').html(calculationText);
      } else {
        calculationAmount = ((bmiResult - 25) * heightImperial * heightImperial)/703;
        calculationAmountRounded = round(calculationAmount,1);
        calculationText = calculationAmountRounded.toString() + ' pounds';
        $('#bmi-calc-amount').html(calculationText);
      }
    } else {
      $('#bmi-calculation').css({'display': 'none'});
    }
});

$(document).on('click', '#btn-calculate.reset', function (e) {
     //Changing button to a Calculate Button & Hiding Results
     $('#btn-calculate').removeClass('reset');
     $('#btn-calculate').addClass('calculate');
     $('#btn-calculate').attr('value','Calculate');
     $('#bmi-result').fadeOut('slow');

     // Remove BMI Score, Rank & Classes
     $('#result-output').html("");
     $('#bmi-rank').removeClass('rank-underweight');
     $('#bmi-rank').removeClass('rank-normal');
     $('#bmi-rank').removeClass('rank-overweight');
     $('#bmi-rank').removeClass('rank-obese');
     $('#bmi-rank').html("");

     // Remove hoverBox & inline CSS
     $('#hover-box').remove();
     $(".graph-item").removeAttr("style");

     //Remove BMI calculation textarea
     $('#bmi-calc-direction').html("");
     $('#bmi-calc-amount').html("");

     //Remove display:none from BMI calculation text
     $('#bmi-calculation').removeAttr("style");

     //Remove accordian active classes
     $('.accordian-underweight, .accordian-underweight .bmi-accordion-header').removeClass('active');
     $('.accordian-normal,.accordian-normal .bmi-accordion-header').removeClass('active');
     $('.accordian-overweight, .accordian-overweight .bmi-accordion-header').removeClass('active');
     $('.accordian-obese, .accordian-obese .bmi-accordion-header').removeClass('active');

 });

$(".bmi-accordion").on("click", ".bmi-accordion-header", function() {
   $(this).toggleClass("active").next().slideToggle();
});



function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

// Helper function to get an element's exact position
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}

// deal with the page getting resized or scrolled
window.addEventListener("scroll", updatePosition, false);
window.addEventListener("resize", updatePosition, false);

function updatePosition() {
  // add your code to update the position when your browser
  // is resized or scrolled
}
