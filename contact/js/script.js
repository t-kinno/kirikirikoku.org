var scrollbar_width = window.innerWidth - document.body.scrollWidth;

if (scrollbar_width > 0) {
  $('.scrollable').addClass('is-scrollbar');
  if (scrollbar_width !== 17) {
    $('.scrollable').css('margin-right', '-' + scrollbar_width + 'px');
  }
}
$(window).on('load', function() {
    var scrollable_height = $('.scrollable').height(),
        adjustment_height = $('.adjustment').outerHeight(),
        scrollbar_height = parseInt(scrollable_height * scrollable_height / adjustment_height);
    
    $('.scrollbar-thumb').css('height', scrollbar_height);

    var scrollbar_track = scrollable_height - scrollbar_height;
  
    $('.scrollable').on('scroll', function() {
        var offset = $(this).scrollTop() * scrollbar_track / (adjustment_height - scrollable_height);
    
        $('.scrollbar-thumb').css('transform', 'translateY(' + offset + 'px)');
    });
    var active = false, // つまみを操作しているかどうか
      scrollbar_thumb_cursor_y; // つまみ内のクリック位置
  
  $('.scrollbar-thumb').on('mousedown', function(event) {
    active = true;
    scrollbar_thumb_cursor_y = event.pageY - $(this).offset().top;
  });
  
  $(document).on('mouseup', function() {
    active = false;
  });
  
  $(document).on('mousemove', function(event) {
    if (!active) return;
    
    var scrollbar_thumb_y = ((event.pageY - $('.scrollbar').offset().top) / scrollbar_track * scrollbar_track) - scrollbar_thumb_cursor_y;
    
    if (scrollbar_thumb_y < 0) {
      scrollbar_thumb_y = 0;
    } else if (scrollbar_thumb_y > scrollbar_track) {
      scrollbar_thumb_y = scrollbar_track;
    }
    
    $('.scrollbar-thumb').css('transform', 'translateY(' + scrollbar_thumb_y + 'px)');

    $('.scrollable').scrollTop(($('.scrollbar-thumb').offset().top - $('.scrollbar').offset().top) / scrollbar_track * (adjustment_height - scrollable_height));
  });
  
  $(document).on('selectstart', function() {
    if (active) return false;
  });
});