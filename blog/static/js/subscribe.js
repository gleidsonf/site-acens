$('#subscribe').submit(function(e) {
  e.preventDefault();
  var email_id = $("#email_id").val();
  if (email_id) {
    var csrfmiddlewaretoken = csrftoken;
    var email_data = {
      "email_id": email_id,
      "csrfmiddlewaretoken": csrfmiddlewaretoken
    };
    $.ajax({
      type: 'POST',
      url: '/subscribe/',
      data: email_data,
      success: function(response) {
        $('#email_id').val('');
        if (response.status == "404") {
          $.notify({
              icon: 'fa fa-exclamation-triangle',
              message: 'Este email já está inscrito!'
          }, {
          	allow_dismiss: true,
          	placement: {
          		from: 'bottom',
          		align: 'left'
          	},
            animate: {
              enter: 'animated fadeInLeft',
              exit: 'animated fadeOutRight'
            },
            type: 'danger'
          });
        } else {
            $.notify({
                icon: 'fa fa-thumbs-o-up',
                message: 'Por favor, verifique seu email e confirme a inscrição!'
            }, {
            	allow_dismiss: true,
            	placement: {
            		from: 'bottom',
            		align: 'left'
            	},
              animate: {
                enter: 'animated fadeInLeft',
                exit: 'animated fadeOutRight'
              },
              type: 'info'
            });
        }
      },
      error: function(response) {

        $('#email_id').val('');
      }
    });
    return false;
  } else {
    $.notify({
        icon: 'fa fa-thumbs-o-down',
        message: 'Ops, email inválido!'
    }, {
      allow_dismiss: true,
      placement: {
        from: 'bottom',
        align: 'left'
      },
      animate: {
        enter: 'animated fadeInLeft',
        exit: 'animated fadeOutRight'
      },
      type: 'danger'
    });
  }
});


function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

function csrfSafeMethod(method) {
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }
  }
})
