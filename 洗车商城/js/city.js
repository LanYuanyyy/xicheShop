
var cityList = [
    { key: 'A', data: ['安庆站', '安宁站'] },
    { key: 'B', data: ['保定站', '宝鸡站'] },
    { key: 'C', data: ['重庆站'] },
    { key: 'D', data: ['东海站'] },
    { key: 'E', data: ['鄂尔多斯站'] },
    { key: 'G', data: ['关山站'] },
    { key: 'H', data: ['杭州站'] },
    { key: 'J', data: ['九江站'] },
    { key: 'K', data: ['开封站'] },
    { key: 'L', data: ['辽宁站'] },
    { key: 'M', data: ['漠河站'] },
    { key: 'N', data: ['南京站'] },
    { key: 'P', data: ['萍乡站'] },
    { key: 'Q', data: ['泉州站'] },
    { key: 'R', data: ['瑞安站'] },
    { key: 'S', data: ['三亚市'] },
    { key: 'T', data: ['唐山站'] },
    { key: 'W', data: ['乌苏站'] },
    { key: 'X', data: ['徐州站'] },
    { key: 'Y', data: ['扬州站'] },
    { key: 'Z', data: ['湛江站'] }
  ];

  var hotCity = ['徐州站', '北京站', '上海站', '深圳站', '广州站', '南京站', '苏州站', '武汉站', '西安站'];

  $(function () {
      init();
      // 选择城市
      $('body').on('click', '.city-list p', function () {
          var data = $(this).text();
          saveHistory(data);
      });

      $('.hot.hotCity').on('click', 'div', function () {
          var data = $(this).text();
          saveHistory(data);
      });

  });

  function bindHistoryClick() {
    $('.history .hot').on('click', 'div', function () {
        var data = $(this).text();
        saveHistory(data);
    });

  }

  function init() {
      $('.city').html('');
      var hotHtml = '';
      hotHtml += '<div class="tips" id="热门1">热门站点</div>';
      hotHtml += '<div class="hot hotCity">';
      $.each(hotCity, function (i, item) {
          hotHtml += '<div>' + item + '</div>'
      });
      hotHtml += '</div>';
      hotHtml += '<div class="history"></div>';
      $('.city').append(hotHtml);


      var html = '';
      $.each(cityList, function (i, item) {
          html += '<div class="city-list"><span class="city-letter" id="' + item.key + '1">' + item.key + '</span>';
          $.each(item.data, function (j, data) {
              html += '<p>' + data + '</p>';
          });
          html += '</div>';
      })
      $('.city').append(html);
  }

  ; (function ($) {

      $('.letter').bind("touchstart touchmove", function (e) {
          var top = $(window).scrollTop();
          e.preventDefault();//阻止默认滚动
          var touch = e.touches[0];
          var ele = document.elementFromPoint(touch.pageX, touch.pageY - top);

          if (ele.tagName === 'A') {
              var s = $(ele).text();
              $(window).scrollTop($('#' + s + '1').offset().top)
              $("#showLetter span").html(s.substring(0, 1));
              $("#showLetter").show().delay(500).hide(0);
          }
      });

      $('.letter').bind("touchend", function (e) {
          $("#showLetter").hide(0);
      });

  })(Zepto);
