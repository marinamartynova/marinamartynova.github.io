$(document).ready(function() {
    loadFrame("tab1");
    
    $(".tab").click(function(){
        $(".tab").removeClass("tabActive");
        $(this).addClass("tabActive");
    
        $(".tabContent").removeClass("tabContentVisible");
        loadFrame($(this).attr("id"));
    });
});

$(".tab3").ready(function() {
    $("#КИП").click();
});
    
$(".btn").click(function() {  
    $("#search").val("");
    $("#searchError").css("display","none");
    $(".btn").removeClass("btn-active");
    $(this).addClass("btn-active");
    $(this).addClass("btn-active");
    $(this).blur();

    var docId = $(this).attr("id");

    $('.document').removeClass("docActive");
    $('*[data-id="' + docId + '"]').addClass("docActive");
});
    function showSearch(){
    var searchString = search.value.trim().toLowerCase();
    if (searchString != "") {
        $(".btn").removeClass("btn-active");
        $('.document').removeClass("docActive");
        $('#searchError').css("display","none");
        
        var docs = $('.document');
        var displayCount = 0;
        
        $.each(docs, function (index, value) {
            var docTitle = $(docs[index]).text().toLowerCase();
            if (docTitle.indexOf(searchString) != -1) {
                $(docs[index]).addClass("docActive");
                displayCount++;
            }
        });
        if (displayCount == 0) {
            $("#searchError").css("display","block");
        }
    } else {
        $("#КИП").click();
    }   
}

search.onkeyup = search.oninput = showSearch;
search.onpropertychange = function() {
    if (event.propertyName == "value") showSearch();
}
search.oncut = function() {
    setTimeout(showSearch, 0);
}

function loadFrame(id){
    var currentId = id;
    var currentBlock = $('*[data-id="'+currentId+'"]');
    var content = currentBlock.html();
    if(content != ""){
        currentBlock.addClass("tabContentVisible");
        $(".loader").css("display","none");
        $(".tabContentWrap").css("display","block");
    } else{
        $(".loader").css("display","block");
        $(".tabContentWrap").css("display","none");

        var url = currentBlock.attr("data-url");
        currentBlock.html('<iframe src="" width="100%" height="100%" id="'+currentId+'Content">');
        $("#"+currentId+"Content").on("load", function () {
            currentBlock.addClass("tabContentVisible");
            $(".loader").css("display","none");
            $(".tabContentWrap").css("display","block");
        });
        $("#"+currentId+"Content").attr('src', url);
    }
}

$('.supp').on('click', function(event){
    if (window.event) {
        window.event.returnValue = false;
    }
    event.preventDefault();
    $('#tab1').click();
});
