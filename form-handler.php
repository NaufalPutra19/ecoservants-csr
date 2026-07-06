<?php
function ecoservants_handle_csr_form() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['csr_submit'])) {
        if (!isset($_POST['csr_form_nonce_field']) || !wp_verify_nonce($_POST['csr_form_nonce_field'], 'csr_form_nonce')) {
            die('Security check failed');
        }

        if (!empty($_POST['csr_honeypot'])) {
            die('Spam detected');
        }

        $name = sanitize_text_field($_POST['csr_name']);
        $email = sanitize_email($_POST['csr_email']);
        $date = sanitize_text_field($_POST['csr_date']);
        $location = sanitize_text_field($_POST['csr_location']);
        $location = str_replace(',', ' -', $location); // Replace commas with a dash for consistency
        $unsorted_litter_weight = floatval($_POST['csr_unsorted_litter_weight']);
        $unsorted_litter_subcategories = isset($_POST['csr_unsorted_litter_subcategories']) ? implode(',', array_map('sanitize_text_field', $_POST['csr_unsorted_litter_subcategories'])) : '';
        $unsorted_litter_subcategories_count = isset($_POST['csr_unsorted_litter_subcategories_count']) ? array_map('intval', $_POST['csr_unsorted_litter_subcategories_count']) : [];
        $plastic_waste_weight = floatval($_POST['csr_plastic_waste_weight']);
        $plastic_subcategories = isset($_POST['csr_plastic_subcategories']) ? implode(',', array_map('sanitize_text_field', $_POST['csr_plastic_subcategories'])) : '';
        $plastic_subcategories_count = isset($_POST['csr_plastic_subcategories_count']) ? array_map('intval', $_POST['csr_plastic_subcategories_count']) : [];
        $paper_waste_weight = floatval($_POST['csr_paper_waste_weight']);
        $paper_subcategories = isset($_POST['csr_paper_subcategories']) ? implode(',', array_map('sanitize_text_field', $_POST['csr_paper_subcategories'])) : '';
        $paper_subcategories_count = isset($_POST['csr_paper_subcategories_count']) ? array_map('intval', $_POST['csr_paper_subcategories_count']) : [];
        $metal_waste_weight = floatval($_POST['csr_metal_waste_weight']);
        $metal_subcategories = isset($_POST['csr_metal_subcategories']) ? implode(',', array_map('sanitize_text_field', $_POST['csr_metal_subcategories'])) : '';
        $metal_subcategories_count = isset($_POST['csr_metal_subcategories_count']) ? array_map('intval', $_POST['csr_metal_subcategories_count']) : [];
        $glass_waste_weight = floatval($_POST['csr_glass_waste_weight']);
        $glass_subcategories = isset($_POST['csr_glass_subcategories']) ? implode(',', array_map('sanitize_text_field', $_POST['csr_glass_subcategories'])) : '';
        $glass_subcategories_count = isset($_POST['csr_glass_subcategories_count']) ? array_map('intval', $_POST['csr_glass_subcategories_count']) : [];
        $food_waste_weight = floatval($_POST['csr_food_waste_weight']);
        $food_subcategories = isset($_POST['csr_food_subcategories']) ? implode(',', array_map('sanitize_text_field', $_POST['csr_food_subcategories'])) : '';
        $food_subcategories_count = isset($_POST['csr_food_subcategories_count']) ? array_map('intval', $_POST['csr_food_subcategories_count']) : [];

        // --- FIX (#4): the six fields below previously saved counts only and
        // silently dropped the subcategory label checkboxes the browser sent.
        // Now captured the same way as plastic/paper/metal/glass/food above.
        $cigarette_litter_weight = floatval($_POST['csr_cigarette_litter_weight']);
        $cigarette_subcategories = isset($_POST['csr_cigarette_subcategories']) ? implode(',', array_map('sanitize_text_field', $_POST['csr_cigarette_subcategories'])) : '';
        $cigarette_subcategories_count = isset($_POST['csr_cigarette_subcategories_count']) ? array_map('intval', $_POST['csr_cigarette_subcategories_count']) : [];

        $textiles_weight = floatval($_POST['csr_textiles_weight']);
        $textiles_subcategories = isset($_POST['csr_textiles_subcategories']) ? implode(',', array_map('sanitize_text_field', $_POST['csr_textiles_subcategories'])) : '';
        $textiles_subcategories_count = isset($_POST['csr_textiles_subcategories_count']) ? array_map('intval', $_POST['csr_textiles_subcategories_count']) : [];

        $medical_waste_weight = floatval($_POST['csr_medical_waste_weight']);
        $medical_subcategories = isset($_POST['csr_medical_subcategories']) ? implode(',', array_map('sanitize_text_field', $_POST['csr_medical_subcategories'])) : '';
        $medical_subcategories_count = isset($_POST['csr_medical_subcategories_count']) ? array_map('intval', $_POST['csr_medical_subcategories_count']) : [];

        $sanitary_products_weight = floatval($_POST['csr_sanitary_products_weight']);
        $sanitary_subcategories = isset($_POST['csr_sanitary_subcategories']) ? implode(',', array_map('sanitize_text_field', $_POST['csr_sanitary_subcategories'])) : '';
        $sanitary_subcategories_count = isset($_POST['csr_sanitary_subcategories_count']) ? array_map('intval', $_POST['csr_sanitary_subcategories_count']) : [];

        $fishing_gear_weight = floatval($_POST['csr_fishing_gear_weight']);
        $fishing_subcategories = isset($_POST['csr_fishing_subcategories']) ? implode(',', array_map('sanitize_text_field', $_POST['csr_fishing_subcategories'])) : '';
        $fishing_subcategories_count = isset($_POST['csr_fishing_subcategories_count']) ? array_map('intval', $_POST['csr_fishing_subcategories_count']) : [];

        $styrofoam_hazardous_waste_weight = floatval($_POST['csr_styrofoam_hazardous_waste_weight']);
        $styrofoam_subcategories = isset($_POST['csr_styrofoam_subcategories']) ? implode(',', array_map('sanitize_text_field', $_POST['csr_styrofoam_subcategories'])) : '';
        $styrofoam_subcategories_count = isset($_POST['csr_styrofoam_subcategories_count']) ? array_map('intval', $_POST['csr_styrofoam_subcategories_count']) : [];

        // --- FIX (#4): hazardous subcategories were rendered in the form and
        // submitted by the browser but never read/saved at all. Now captured.
        $hazardous_subcategories = isset($_POST['csr_hazardous_subcategories']) ? implode(',', array_map('sanitize_text_field', $_POST['csr_hazardous_subcategories'])) : '';
        $hazardous_subcategories_count = isset($_POST['csr_hazardous_subcategories_count']) ? array_map('intval', $_POST['csr_hazardous_subcategories_count']) : [];

        $miscellaneous_weight = floatval($_POST['csr_miscellaneous_weight']);
        $miscellaneous_subcategories = isset($_POST['csr_miscellaneous_subcategories']) ? implode(',', array_map('sanitize_text_field', $_POST['csr_miscellaneous_subcategories'])) : '';
        $miscellaneous_subcategories_count = isset($_POST['csr_miscellaneous_subcategories_count']) ? array_map('intval', $_POST['csr_miscellaneous_subcategories_count']) : [];

        $derelict_items_weight = floatval($_POST['csr_derelict_items_weight']);
        $derelict_subcategories = isset($_POST['csr_derelict_subcategories']) ? implode(',', array_map('sanitize_text_field', $_POST['csr_derelict_subcategories'])) : '';
        $derelict_subcategories_count = isset($_POST['csr_derelict_subcategories_count']) ? array_map('intval', $_POST['csr_derelict_subcategories_count']) : [];

        // --- FIX (#4): csr_notes was read without isset(), causing a PHP
        // warning on every submission since no matching field exists in the
        // current template. Guarded here; template fix (adding the actual
        // textarea) is tracked separately so this handler doesn't silently
        // eat real notes once the field is added.
        $notes = isset($_POST['csr_notes']) ? sanitize_textarea_field($_POST['csr_notes']) : '';

        $trees_planted = intval($_POST['csr_trees_planted']);
        $invasive_species_removed = intval($_POST['csr_invasive_species_removed']);
        $native_plants_seeded = sanitize_text_field($_POST['csr_native_plants_seeded']);
        $native_plants_seeded_other = sanitize_text_field($_POST['csr_native_plants_seeded_other']);
        $erosion_control_methods = isset($_POST['csr_erosion_control_methods']) ? implode(',', array_map('sanitize_text_field', $_POST['csr_erosion_control_methods'])) : '';
        $erosion_control_notes = sanitize_textarea_field($_POST['csr_erosion_control_notes']);
        $volunteers_involved = intval($_POST['csr_volunteers_involved']);
        $invasive_species_names = sanitize_text_field($_POST['csr_invasive_species_names']);
        $invasive_species_weight = floatval($_POST['csr_invasive_species_weight']);
        // Sanitize other fields as needed

        $post_title = "$name - $location";

        $uploaded_photos = [];
        if (!empty($_FILES['csr_photos']['name'][0])) {
            foreach ($_FILES['csr_photos']['name'] as $key => $value) {
                if ($_FILES['csr_photos']['error'][$key] === UPLOAD_ERR_OK) {
                    $file = [
                        'name' => $_FILES['csr_photos']['name'][$key],
                        'type' => $_FILES['csr_photos']['type'][$key],
                        'tmp_name' => $_FILES['csr_photos']['tmp_name'][$key],
                        'error' => $_FILES['csr_photos']['error'][$key],
                        'size' => $_FILES['csr_photos']['size'][$key],
                    ];
                    $upload = wp_handle_upload($file, ['test_form' => false]);
                    if (isset($upload['file'])) {
                        $attachment_id = wp_insert_attachment([
                            'guid' => $upload['url'],
                            'post_mime_type' => $upload['type'],
                            'post_title' => sanitize_file_name($file['name']),
                            'post_content' => '',
                            'post_status' => 'inherit',
                        ], $upload['file']);
                        require_once(ABSPATH . 'wp-admin/includes/image.php');
                        wp_update_attachment_metadata($attachment_id, wp_generate_attachment_metadata($attachment_id, $upload['file']));
                        $uploaded_photos[] = $attachment_id;
                    }
                }
            }
        }

        $meta_input = [
            'csr_name' => $name,
            'csr_email' => $email,
            'csr_date' => $date,
            'csr_location' => $location,
            'csr_unsorted_litter_weight' => $unsorted_litter_weight,
            'csr_unsorted_litter_subcategories' => $unsorted_litter_subcategories,
            'csr_unsorted_litter_subcategories_count' => json_encode($unsorted_litter_subcategories_count),
            'csr_plastic_waste_weight' => $plastic_waste_weight,
            'csr_plastic_subcategories' => $plastic_subcategories,
            'csr_plastic_subcategories_count' => json_encode($plastic_subcategories_count),
            'csr_paper_waste_weight' => $paper_waste_weight,
            'csr_paper_subcategories' => $paper_subcategories,
            'csr_paper_subcategories_count' => json_encode($paper_subcategories_count),
            'csr_metal_waste_weight' => $metal_waste_weight,
            'csr_metal_subcategories' => $metal_subcategories,
            'csr_metal_subcategories_count' => json_encode($metal_subcategories_count),
            'csr_glass_waste_weight' => $glass_waste_weight,
            'csr_glass_subcategories' => $glass_subcategories,
            'csr_glass_subcategories_count' => json_encode($glass_subcategories_count),
            'csr_food_waste_weight' => $food_waste_weight,
            'csr_food_subcategories' => $food_subcategories,
            'csr_food_subcategories_count' => json_encode($food_subcategories_count),

            // FIX (#4): subcategory label arrays now saved, not just counts
            'csr_cigarette_litter_weight' => $cigarette_litter_weight,
            'csr_cigarette_subcategories' => $cigarette_subcategories,
            'csr_cigarette_subcategories_count' => json_encode($cigarette_subcategories_count),
            'csr_textiles_weight' => $textiles_weight,
            'csr_textiles_subcategories' => $textiles_subcategories,
            'csr_textiles_subcategories_count' => json_encode($textiles_subcategories_count),
            'csr_medical_waste_weight' => $medical_waste_weight,
            'csr_medical_subcategories' => $medical_subcategories,
            'csr_medical_subcategories_count' => json_encode($medical_subcategories_count),
            'csr_sanitary_products_weight' => $sanitary_products_weight,
            'csr_sanitary_subcategories' => $sanitary_subcategories,
            'csr_sanitary_subcategories_count' => json_encode($sanitary_subcategories_count),
            'csr_fishing_gear_weight' => $fishing_gear_weight,
            'csr_fishing_subcategories' => $fishing_subcategories,
            'csr_fishing_subcategories_count' => json_encode($fishing_subcategories_count),
            'csr_styrofoam_hazardous_waste_weight' => $styrofoam_hazardous_waste_weight,
            'csr_styrofoam_subcategories' => $styrofoam_subcategories,
            'csr_styrofoam_subcategories_count' => json_encode($styrofoam_subcategories_count),

            // FIX (#4): hazardous subcategories now saved (previously dropped entirely)
            'csr_hazardous_subcategories' => $hazardous_subcategories,
            'csr_hazardous_subcategories_count' => json_encode($hazardous_subcategories_count),

            'csr_miscellaneous_weight' => $miscellaneous_weight,
            'csr_miscellaneous_subcategories' => $miscellaneous_subcategories,
            'csr_miscellaneous_subcategories_count' => json_encode($miscellaneous_subcategories_count),
            'csr_derelict_items_weight' => $derelict_items_weight,
            'csr_derelict_subcategories' => $derelict_subcategories,
            'csr_derelict_subcategories_count' => json_encode($derelict_subcategories_count),
            'csr_notes' => $notes,
            'csr_photos' => !empty($uploaded_photos) ? implode(',', $uploaded_photos) : '',
            'csr_trees_planted' => $trees_planted,
            'csr_invasive_species_removed' => $invasive_species_removed,
            'csr_native_plants_seeded' => $native_plants_seeded,
            'csr_native_plants_seeded_other' => $native_plants_seeded_other,
            'csr_erosion_control_methods' => $erosion_control_methods,
            'csr_erosion_control_notes' => $erosion_control_notes,
            'csr_volunteers_involved' => $volunteers_involved,
            'csr_invasive_species_names' => $invasive_species_names,
            'csr_invasive_species_weight' => $invasive_species_weight,
        ];

        $post_id = wp_insert_post([
            'post_title' => $post_title,
            'post_type' => 'csr_report',
            'post_status' => 'publish',
            'meta_input' => $meta_input,
        ]);

        if ($post_id) {
            wp_redirect(add_query_arg('submitted', 'true', wp_get_referer()));
            exit;
        } else {
            wp_redirect(add_query_arg('submitted', 'false', wp_get_referer()));
            exit;
        }
    }
}

add_action('admin_post_nopriv_csr_form', 'ecoservants_handle_csr_form');
add_action('admin_post_csr_form', 'ecoservants_handle_csr_form');
add_action('save_post_csr_report', 'ecoservants_save_meta_boxes');
?>
