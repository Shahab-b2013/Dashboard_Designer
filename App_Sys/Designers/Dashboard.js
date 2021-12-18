// JScript File(Amnpardaz Software Co. Copyright 2020 - All Right Reserved)
// Release Ferdos.WebAppDesk 3.0.0.0

function editDashboard(formData) {

    var _formData = formData;

    this.submit = function () {

        $.ajax({

            type: 'POST',

            url: 'App_Sys/Services/Designers/Dashboard.asmx/EditDesign',

            data: _formData,

            contentType: false,

            dataType: 'xml',

            processData: false,

            error: function (jqXHR, textStatus, errorThrown) {

                alert(JSON.stringify(jqXHR));
            },

            success: function (data) {

                console.log(data);
            }
        });
    }
}