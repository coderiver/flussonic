import $ from 'jquery';


$(function() {
    $("#create_trial_form").submit(function(e) {
        e.preventDefault();
        $("#error_message").css({opacity: 0, display: "none"}).html("");

        var name = $(this).find("#name").val();
        var email = $(this).find("#email").val();
        if(email) {
            email = email.toLowerCase().replace(" ","");
            $(this).find("#email").val(email);
        }
        var comment = $(this).find("#comment").val();
        var authenticity_token = $(this).find("#authenticity_token").val();

        if(!name || name.length < 2) {
            $("#error_message").html("Enter your name please").css({opacity: 0, display: "block"}).animate({opacity: 1.0}, 200);
            return false;
        }

        if(!email || email.length < 4 || email.indexOf("@") == -1) {
            $("#error_message").html("We need your correct email to give you a key").css({opacity: 0, display: "block"}).animate({opacity: 1.0}, 200);
            return false;
        }

        var email_domain = email.split("@")[1];
        var blocklist = {"mailinator.com": true};
        if(blocklist[email_domain]) {
            $("#error_message").html("Please, use good email domain").css({opacity: 0, display: "block"}).animate({opacity: 1.0}, 200);
            return false;
        }

        if(!comment || comment.length < 3) {
            $("#error_message").html("Give a brief project description, please").css({opacity: 0, display: "block"}).animate({opacity: 1.0}, 200);
            return false;
        }

        $("#success_message").css({opacity: 0, display: "block"});

        $.ajax({
            url: $(this).attr('action'),
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                name: name,
                email: email,
                comment: comment,
                authenticity_token: authenticity_token
            }),
            error: function() {
                $("#error_message").html("Failed to request a trial. Please write on <a href='mailto:info@erlyvideo.org'>info@erlyvideo.org</a>").css({opacity: 0, display: "block"}).animate({opacity: 1.0}, 200);
            },
            success: function() {
                $("#success_message").animate({opacity: 1.0}, 200);
            }
        });
        return false;
    });
});
