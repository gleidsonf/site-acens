$('.post img').addClass('img-responsive');

$(document).on('submit', '#form_contact', function(e) {
  e.preventDefault();

  jQuery.ajax({
    type: 'POST',
    URL: '/sendemail.php/',
    data: {
      name: jQuery('#id_email').val(),
      email: jQuery('#id_email').val(),
      subject: jQuery('#id_email').val(),
      message: jQuery('#id_email').val(),
    },
    success: function() {
        console.log('It\'s work!!');

        jQuery.notify('Em breve entaremos em contato!!', {
        	allow_dismiss: false,
        	placement: {
        		from: 'bottom',
        		align: 'left'
        	}
        });
        jQuery('#form_contact')[0].reset();
    },
    error: function() {
      console.log('or not');
    }
  });
});
