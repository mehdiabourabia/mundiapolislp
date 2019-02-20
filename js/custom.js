function step1 () {
      $(".form").hide();
      $("#previous").hide();
      $("#form1").show();
      _data_lp = "/inscription";
      progressl = "0";
      _data_source = getSource();
      _data_campaign = getCampaign();
}

function step2(x) {
     _data_programme = x;
     error("");
     $(".form").hide();
     $("#form2").show();
     $("#previous").show();
}

function step3 () {
     _data_anneebac = $.trim($("#anneebac").val());
     _data_seriebac = $.trim($("#seriebac").val());
     _data_typelycee = $.trim($("#typelycee").val());
     _data_bacCity = $.trim($("#bacCity").val());

     if (_data_anneebac.length == 0) {
       error("Veuillez renseigner l'année de votre BAC");
    }else if (_data_seriebac.length == 0) {
       error("Veuillez renseigner la série de votre BAC");
    }else if (_data_typelycee.length == 0) {
       error("Veuillez renseigner le type de votre lycée");
    }else if (_data_bacCity.length == 0) {
       error("Veuillez renseigner votre ville");
    }else {
      error("");
      $(".form").hide();
      $("#form3").show();
    }
}

function step4 () {
     _data_lastname = $.trim($("#nom").val());
     _data_firstname = $.trim($("#prenom").val());
     _data_email = $.trim($("#email").val());
     _data_indicatif = $.trim($("#indicatif").val());
     _data_phone = $.trim($("#mobile").val()).replace(/^0+/, '');
     if (_data_lastname.length == 0 || _data_firstname.length == 0) {
       error("Veuillez renseigner votre nom et prénom");
       return;
    }
    if (!isEmail(_data_email)) {
       error("Veuillez renseigner une adresse email valide");
       return;
    }
    if (_data_phone.length < 4) {
       error("Veuillez renseigner un numéro de téléphone valide");
       return;
    }
    else {
      $(".step-action").hide();
jQuery.ajax({
           url: "https://docs.google.com/forms/d/1mq3R9raOjMg9oV03iRSj_40HO3NjDUKiTQawHwOy4uA/formResponse",
           data: {
             entry_1031948198: _data_lastname,
             entry_1588054526: _data_firstname,
             entry_1621807171: _data_indicatif+_data_phone,
             entry_186405740: _data_email,
             entry_1559248516: _data_programme,
             entry_1403683406: _data_anneebac,
             entry_1956914555: _data_seriebac,
             entry_1858888972: _data_typelycee,
             entry_349401136: _data_bacCity,
             entry_868385415: _data_source,
             entry_915206214: _data_campaign,
             entry_820778906: _data_lp
            },
             type: "POST",
             dataType: "xml"
        });
         setTimeout(function() {window.location.href = "confirmation.html";}, 2000);}
     }


function isEmail(email) {
 var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 return regex.test(email);
}

function getSource() {
 var ga_source = decodeURIComponent((new RegExp('[?|&]utm_source=([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || "";
 return ga_source;
}
function getCampaign() {
  var ga_campaign = decodeURIComponent((new RegExp('[?|&]utm_campaign=([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || "";
  return ga_campaign;
 }
function getURLParameter(name, _url) {
 return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(_url) || [, ''])[1]);
}

error = function (msg) {
  $("#messagebar").html(msg);
}

previous = function () {
  $(".form").hide();
  $("#form1").show();
  step = 1;
  error("");
}

progress = function (x) {
  if (x > progressl) { progressl = x; }
  var progressw = progressl / 9 * 100;
  $("#progressbar").css("width", progressw + "%");
}

$(document).ready(function () {
  step1();
  $(".owl-carousel").owlCarousel({
    loop:true,
    items: 3,
    dots: false,
    nav: true, 
    navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
    rewindNav : true,
    autoHeight: true,
    lazyLoad:true,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            mergeFit:false
        },
        600:{
            items:2,
            mergeFit:false
        },
        1000:{
            items:3,
            mergeFit:true
        }
      }
  });
});