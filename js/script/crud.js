$(document).ready(function () {
    loadData(1, 5)
    // loadImage()
    let article = {
        TITLE: "",
        DESCRIPTION: ""
    }
    // fetchArticle()
    $('#callModal').click(function(){
        $('#articleModal').modal('show')
    })
    $('#save').click(function(){
        console.log($('#title').val())
        article.TITLE = $('#title').val()
        article.DESCRIPTION = $('#desc').val()
        addArticle(article)
       //hide modal 
        $('#articleModal').modal('hide')
    })
})
function addArticle(article){
    //title & description
    $.ajax({
        url: "http://api-ams.me/v1/api/articles",
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        data: JSON.stringify(article),
        success: function(){
            loadData(1, 5)
        },
        error: function(er){
            console.log(er)
        }
    })
}
//request data by jquery function
function loadData(page, limit) {
    $.ajax({
        url: `http://api-ams.me/v1/api/articles?page=${page}&limit=${limit}`,
        method: "GET",
        success: function (response) {
            console.log(response);
            //append data in table
            showDataToTable(response.DATA)
        },
        error: function (er) {
            console.log(er)
        }
    })
}
function showDataToTable(article) {
    var content = ""
    for (a of article) {
        content +=
            `
            <tr>
                <td class="ID">${a.ID}</td>
                <td>${a.TITLE}</td>
                <td>${a.DESCRIPTION}</td>
                <td><img class="img-thumbnail" src=${a.IMAGE} /></td>
                <td><button class="btn btn-outline-primary wave-effect" onclick="deleteArticle(this)">DELETE</button><button class="btn btn-outline-primary wave-effect">EDIT</button></td>
            </tr>
        `
    }
    $('tbody').html(content)
}

function deleteArticle(btn) {
    // let id = $(btn).parents('tr').find('td')[0].innerHTML
    let c = confirm("Are you sure to delete this item?")
    if (c == true) {
        let id = $(btn).parents('tr').find('.ID').text()
        console.log(id);
        $.ajax({
            url: "http://api-ams.me/v1/api/articles/" + id,
            method: "DELETE",
            success: function (res) {
                loadData(1, 5)
            },
            error: function (er) {
                console.log(er);
            }
        })
    }
}

window.onscroll = function(){
    console.log($(window).scrollTop());
   scroll()
}
function scroll(){
    if ($(window).scrollTop() > 100) {
        // document.getElementById('myBtn').className = "show"
        $('#myBtn').removeClass('hide')
        $('#myBtn').addClass('show')
      } else {
        // document.getElementById('myBtn').className = "hide"
        $('#myBtn').removeClass('show')
        $('#myBtn').addClass('hide')
      }
}
function goToTop(){
    document.documentElement.scrollTop = 0;
}
