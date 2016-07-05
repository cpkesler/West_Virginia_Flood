$(function() { //wait for page to load
//Removes and adds the time input (comid_time) depending on forecast range (short, medium, long)
    $('#forecast_range').on('change', function () {
        if ($('#forecast_range').val() === 'short_range') {
            $('#comid_time').parent().removeClass('hidden');
        } else if ($('#forecast_range').val() === 'medium_range') {
            $('#comid_time').parent().addClass('hidden');
        } else if ($('#forecast_range').val() === 'long_range'){
            $('#comid_time').parent().addClass('hidden');
        }
    });
});
