jQuery(document).ready(function ($) {
    var mediaUploader;

    $('#upload-hero-image').on('click', function (e) {
        e.preventDefault();

        if (mediaUploader) {
            mediaUploader.open();
            return;
        }

        mediaUploader = wp.media({
            title: 'Choose Hero Image',
            button: {
                text: 'Select Image'
            },
            multiple: false
        });

        mediaUploader.on('select', function () {
            var attachment = mediaUploader.state().get('selection').first().toJSON();
            $('#biancorosso_hero_image').val(attachment.id);
            $('#hero-image-preview').html('<img src="' + attachment.url + '" style="max-width: 400px; height: auto;" />');

            // Show remove button if not already visible
            if ($('#remove-hero-image').length === 0) {
                $('#upload-hero-image').after('<button type="button" class="button" id="remove-hero-image">Remove Image</button>');
            }
        });

        mediaUploader.open();
    });

    $(document).on('click', '#remove-hero-image', function (e) {
        e.preventDefault();
        $('#biancorosso_hero_image').val('');
        $('#hero-image-preview').html('');
        $(this).remove();
    });
});
