new Fingerprint2().get(function(result, components){
    var data = {};
    data.userAgent = components[0];
    data.language = components[1];
    data.os = components[12];

    console.log(data)

    $("#components").val(JSON.stringify(components));
    $("#fingerprint").val(result);
    console.log(result); //a hash, representing your device fingerprint
    // an array of FP components
});


$("#test_fingerprint" ).click(function() {
    $("#form").submit();
});

function server(fingerprint, components) {
    var data = {};
    data.fingerprint = fingerprint;
    data.userAgent = components[0];
    data.language = components[1];
    data.os = components[12];

    $.ajax({
        type: "POST",
        url: "fingerprint",
        data: data,
        dataType: "json",
        success: function(resultData){
            alert("Save Complete");
        }
    });
}