//area开始
$(document).ready(function(){
  $(".area").click(function(){
    if ($('.area-eject').hasClass('grade-w-roll')) {
      $(".popupbox").removeClass("show");
      $('.area-eject').removeClass('grade-w-roll');
      $(this).removeClass('current');
    } else {
      $(".popupbox").addClass("show");
      $('.area-eject').addClass('grade-w-roll');
      $(this).addClass('current');
      $(".defult").removeClass('current');
      $(".sort").removeClass('current');
    }
  });
});

//sort开始
$(document).ready(function(){
  $(".sort").click(function(){
    if ($('.sort-eject').hasClass('grade-w-roll')) {
      $(".popupbox").removeClass("show");
      $('.sort-eject').removeClass('grade-w-roll');
      $(this).removeClass('current');
      $('.screening').attr('style',' ');
    } else {
      $(".popupbox").addClass("show");
      $('.sort-eject').addClass('grade-w-roll');
      $(this).addClass('current');
      $(".defult").removeClass('current');
      $(".area").removeClass('current');
    }
  });
});

//defult开始
$(document).ready(function(){
  $(".defult").click(function(){
    if ($('.grade-eject').hasClass('grade-w-roll')) {
      $(".popupbox").removeClass("show");
      $('.grade-eject').removeClass('grade-w-roll');
      $(this).removeClass('current');
    } else {
      $(".popupbox").addClass("show");
      $('.grade-eject').addClass('grade-w-roll');
      $(this).addClass('current');
      $(".area").removeClass('current');
      $(".sort").removeClass('current');
    }
  });
});

$(document).ready(function(){
  $(".popupbox").click(function(){
    console.log('-------------');
    $(".popupbox").removeClass("show");
    $(".screening>ul>li").removeClass("current");
    $('.area-eject,.sort-eject,.grade-eject').removeClass('grade-w-roll');
  });
});

$(document).ready(function(){
  $(".defult").click(function(){
    if ($('.area-eject').hasClass('grade-w-roll')){
      $('.area-eject').removeClass('grade-w-roll');
    }
  });
});
$(document).ready(function(){
  $(".defult").click(function(){
    if ($('.sort-eject').hasClass('grade-w-roll')){
      $('.sort-eject').removeClass('grade-w-roll');
    }
  });
});
$(document).ready(function(){
  $(".defult").click(function(){
    if ($('.sort-sort').hasClass('grade-w-roll')){
      $('.sort-sort').removeClass('grade-w-roll');
    }
  });
});

$(document).ready(function(){
  $(".area").click(function(){
    if ($('.sort-eject').hasClass('grade-w-roll')){
      $('.sort-eject').removeClass('grade-w-roll');
    }
  });
});
$(document).ready(function(){
  $(".area").click(function(){
    if ($('.grade-eject').hasClass('grade-w-roll')){
      $('.grade-eject').removeClass('grade-w-roll');
    }
  });
});
$(document).ready(function(){
  $(".area").click(function(){
    if ($('.sort-sort').hasClass('grade-w-roll')){
      $('.sort-sort').removeClass('grade-w-roll');
    }
  });
});

$(document).ready(function(){
  $(".sort").click(function(){
    if ($('.area-eject').hasClass('grade-w-roll')){
      $('.area-eject').removeClass('grade-w-roll');
    }
  });
});
$(document).ready(function(){
  $(".sort").click(function(){
    if ($('.grade-eject').hasClass('grade-w-roll')){
      $('.grade-eject').removeClass('grade-w-roll');
    }
  });
});
$(document).ready(function(){
  $(".sort").click(function(){
    if ($('.sort-sort').hasClass('grade-w-roll')){
      $('.sort-sort').removeClass('grade-w-roll');
    }
  });
});

function grade1(wbj){
  var arr = document.getElementById("gradew").getElementsByTagName("li");
  for (var i = 0; i < arr.length; i++){
    var a = arr[i];
    a.style.color = "";
  }
  wbj.style.color = "#47b7fc"
}

function areatw(wbj){
  var arr = document.getElementById("areatw").getElementsByTagName("li");
  for (var i = 0; i < arr.length; i++){
    var a = arr[i];
    a.style.color = "";
  }
  wbj.style.color = "#47b7fc"
}

function Categoryt(tbj){
  var arr = document.getElementById("Categoryt").getElementsByTagName("li");
  for (var i = 0; i < arr.length; i++){
    var a = arr[i];
    a.style.color = "";
  }
}

function sorts(sbj){
  var arr = document.getElementById("sort-sort").getElementsByTagName("li");
  for (var i = 0; i < arr.length; i++){
    var a = arr[i];
    a.style.color = "";
  }
  sbj.style.color = "#47b7fc"
}
