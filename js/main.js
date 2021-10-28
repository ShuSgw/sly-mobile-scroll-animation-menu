var scrollFlg = true;
var sly = new Sly('#frame', {
    horizontal: true,
    itemNav: 'basic',
    smart: true,
    activateOn: 'click',
    speed: 300,
    mouseDragging: true,
    touchDragging: true,
    releaseSwing : true,
    dragHandle: true, 
}).init();

$(window).on('resize', function(e) {
    sly.reload();
});


$(window).on('scroll', function (event) {
    if (!scrollFlg) {
        return;
    }
    var scroll = $(this).scrollTop() + 50;
    scrollProcess(scroll);
});

$('#frame li a').on('click', function(){
    scrollFlg = false;
    setTimeout(function(){
        scrollFlg = true;
    }, 1000);
});

function scrollProcess(scroll) {
    var contents = [];
    $('#frame li a').each(function (i, v) {
        var id = $(v).attr('href');
        contents.push({
            index: i,
            id: id,
            top: $(id).offset().top,
            height: $(id).outerHeight()
        });
    });
    var findResult = contents.find(function (c) {
        return (scroll >= c.top && scroll < c.top + c.height)
    });
    if (findResult === undefined) {
        return;
    }
    $('#frame li').removeClass('active');
    var dom = $('#frame li').eq(findResult.index);
    dom.addClass('active');
    sly.toStart(dom)
}