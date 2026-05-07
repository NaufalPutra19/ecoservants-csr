// Voice Assistant for CSR Form (Rewritten for Section/Field/Subcategory Hierarchy)

(function () {
    // Hierarchical structure for the form
    const formSections = [
        {
            label: "Name",
            id: "csr_name",
            type: "text"
        },
        {
            label: "Email",
            id: "csr_email",
            type: "email"
        },
        {
            label: "Date",
            id: "csr_date",
            type: "date"
        },
        {
            label: "Location",
            id: "csr_location",
            type: "text"
        },
        {
            label: "Unsorted Litter (lbs)",
            id: "csr_unsorted_litter_weight",
            type: "number",
            subcategories: [
                {
                    label: "Number of Unsorted Bags Collected",
                    id: "csr_unsorted_bags_count",
                    type: "number"
                }
            ]
        },
        {
            label: "Plastic Waste (lbs)",
            id: "csr_plastic_waste_weight",
            type: "number",
            subcategories: [
                { label: "Plastic bottles", id: "csr_plastic_bottles", type: "number" },
                { label: "Bottle caps", id: "csr_plastic_bottle_caps", type: "number" },
                { label: "Straws & stirrers", id: "csr_plastic_straws_stirrers", type: "number" },
                { label: "Plastic bags", id: "csr_plastic_bags", type: "number" },
                { label: "Food wrappers", id: "csr_plastic_food_wrappers", type: "number" },
                { label: "Plastic utensils", id: "csr_plastic_utensils", type: "number" },
                { label: "Cups & lids", id: "csr_plastic_cups_lids", type: "number" },
                { label: "Six-pack rings", id: "csr_plastic_six_pack_rings", type: "number" },
                { label: "Microplastics", id: "csr_plastic_microplastics", type: "number" },
                { label: "Toys", id: "csr_plastic_toys", type: "number" },
                { label: "Containers (non-food)", id: "csr_plastic_containers_non_food", type: "number" },
                { label: "Hard plastics", id: "csr_plastic_hard_plastics", type: "number" },
                { label: "Packaging materials", id: "csr_plastic_packaging_materials", type: "number" },
                { label: "Fishing nets (plastic-based)", id: "csr_plastic_fishing_nets", type: "number" }
            ]
        },
        {
            label: "Paper Waste (lbs)",
            id: "csr_paper_waste_weight",
            type: "number",
            subcategories: [
                { label: "Newspapers", id: "csr_paper_newspapers", type: "number" },
                { label: "Magazines", id: "csr_paper_magazines", type: "number" },
                { label: "Flyers / brochures", id: "csr_paper_flyers_brochures", type: "number" },
                { label: "Food packaging (paper-based)", id: "csr_paper_food_packaging", type: "number" },
                { label: "Cardboard", id: "csr_paper_cardboard", type: "number" },
                { label: "Paper bags", id: "csr_paper_bags", type: "number" },
                { label: "Napkins / tissues", id: "csr_paper_napkins_tissues", type: "number" },
                { label: "Notebooks / loose paper", id: "csr_paper_notebooks_loose", type: "number" },
                { label: "Cigarette packs (paper-based)", id: "csr_paper_cigarette_packs", type: "number" },
                { label: "Receipts", id: "csr_paper_receipts", type: "number" },
                { label: "Coffee cups (paper with lining)", id: "csr_paper_coffee_cups", type: "number" }
            ]
        },
        {
            label: "Food Waste (lbs)",
            id: "csr_food_waste_weight",
            type: "number",
            subcategories: [
                { label: "Fruit peels", id: "csr_food_fruit_peels", type: "number" },
                { label: "Vegetable scraps", id: "csr_food_vegetable_scraps", type: "number" },
                { label: "Meat scraps", id: "csr_food_meat_scraps", type: "number" },
                { label: "Fish scraps", id: "csr_food_fish_scraps", type: "number" },
                { label: "Egg shells", id: "csr_food_egg_shells", type: "number" }
            ]
        },
        {
            label: "Metal Waste (lbs)",
            id: "csr_metal_waste_weight",
            type: "number",
            subcategories: [
                { label: "Aluminum cans", id: "csr_metal_aluminum_cans", type: "number" },
                { label: "Metal bottle caps", id: "csr_metal_bottle_caps", type: "number" },
                { label: "Metal lids", id: "csr_metal_lids", type: "number" },
                { label: "Metal utensils", id: "csr_metal_utensils", type: "number" },
                { label: "Metal containers", id: "csr_metal_containers", type: "number" },
                { label: "Metal scraps", id: "csr_metal_scraps", type: "number" },
                { label: "Metal wires", id: "csr_metal_wires", type: "number" },
                { label: "Metal tools", id: "csr_metal_tools", type: "number" },
                { label: "Metal toys", id: "csr_metal_toys", type: "number" },
                { label: "Metal furniture", id: "csr_metal_furniture", type: "number" },
                { label: "Metal appliances", id: "csr_metal_appliances", type: "number" }
            ]
        },
        {
            label: "Glass Waste (lbs)",
            id: "csr_glass_waste_weight",
            type: "number",
            subcategories: [
                { label: "Glass bottles", id: "csr_glass_bottles", type: "number" },
                { label: "Glass jars", id: "csr_glass_jars", type: "number" },
                { label: "Glass containers", id: "csr_glass_containers", type: "number" },
                { label: "Glass fragments", id: "csr_glass_fragments", type: "number" },
                { label: "Glass cups", id: "csr_glass_cups", type: "number" },
                { label: "Glass plates", id: "csr_glass_plates", type: "number" },
                { label: "Glass utensils", id: "csr_glass_utensils", type: "number" },
                { label: "Glass toys", id: "csr_glass_toys", type: "number" },
                { label: "Glass furniture", id: "csr_glass_furniture", type: "number" },
                { label: "Glass appliances", id: "csr_glass_appliances", type: "number" }
            ]
        },
        {
            label: "Cigarette Litter (lbs)",
            id: "csr_cigarette_litter_weight",
            type: "number",
            subcategories: [
                { label: "Cigarette butts", id: "csr_cigarette_butts", type: "number" },
                { label: "Cigarette packs", id: "csr_cigarette_packs", type: "number" },
                { label: "Cigarette filters", id: "csr_cigarette_filters", type: "number" },
                { label: "Cigarette wrappers", id: "csr_cigarette_wrappers", type: "number" },
                { label: "Cigarette lighters", id: "csr_cigarette_lighters", type: "number" }
            ]
        },
        {
            label: "Textiles (lbs)",
            id: "csr_textiles_weight",
            type: "number",
            subcategories: [
                { label: "Clothing", id: "csr_textiles_clothing", type: "number" },
                { label: "Shoes", id: "csr_textiles_shoes", type: "number" },
                { label: "Bags", id: "csr_textiles_bags", type: "number" },
                { label: "Hats", id: "csr_textiles_hats", type: "number" },
                { label: "Scarves", id: "csr_textiles_scarves", type: "number" },
                { label: "Gloves", id: "csr_textiles_gloves", type: "number" },
                { label: "Socks", id: "csr_textiles_socks", type: "number" },
                { label: "Underwear", id: "csr_textiles_underwear", type: "number" },
                { label: "Bedding", id: "csr_textiles_bedding", type: "number" },
                { label: "Towels", id: "csr_textiles_towels", type: "number" },
                { label: "Curtains", id: "csr_textiles_curtains", type: "number" }
            ]
        },
        {
            label: "Medical Waste (lbs)",
            id: "csr_medical_waste_weight",
            type: "number",
            subcategories: [
                { label: "Syringes", id: "csr_medical_syringes", type: "number" },
                { label: "Medicine bottles", id: "csr_medical_bottles", type: "number" },
                { label: "Medicine packaging", id: "csr_medical_packaging", type: "number" },
                { label: "Bandages", id: "csr_medical_bandages", type: "number" },
                { label: "Gloves", id: "csr_medical_gloves", type: "number" },
                { label: "Masks", id: "csr_medical_masks", type: "number" },
                { label: "Medical tools", id: "csr_medical_tools", type: "number" },
                { label: "Medical containers", id: "csr_medical_containers", type: "number" },
                { label: "Medical waste bags", id: "csr_medical_waste_bags", type: "number" }
            ]
        },
        {
            label: "Sanitary Products (lbs)",
            id: "csr_sanitary_products_weight",
            type: "number",
            subcategories: [
                { label: "Sanitary pads", id: "csr_sanitary_pads", type: "number" },
                { label: "Tampons", id: "csr_sanitary_tampons", type: "number" },
                { label: "Diapers", id: "csr_sanitary_diapers", type: "number" },
                { label: "Wet wipes", id: "csr_sanitary_wet_wipes", type: "number" },
                { label: "Cotton swabs", id: "csr_sanitary_cotton_swabs", type: "number" },
                { label: "Toilet paper", id: "csr_sanitary_toilet_paper", type: "number" },
                { label: "Tissues", id: "csr_sanitary_tissues", type: "number" }
            ]
        },
        {
            label: "Fishing Gear (lbs)",
            id: "csr_fishing_gear_weight",
            type: "number",
            subcategories: [
                { label: "Fishing nets", id: "csr_fishing_nets", type: "number" },
                { label: "Fishing lines", id: "csr_fishing_lines", type: "number" },
                { label: "Fishing hooks", id: "csr_fishing_hooks", type: "number" },
                { label: "Fishing lures", id: "csr_fishing_lures", type: "number" },
                { label: "Fishing weights", id: "csr_fishing_weights", type: "number" },
                { label: "Fishing floats", id: "csr_fishing_floats", type: "number" },
                { label: "Fishing rods", id: "csr_fishing_rods", type: "number" },
                { label: "Fishing reels", id: "csr_fishing_reels", type: "number" },
                { label: "Fishing bait containers", id: "csr_fishing_bait_containers", type: "number" }
            ]
        },
        {
            label: "Styrofoam & Hazardous Waste (lbs)",
            id: "csr_styrofoam_hazardous_waste_weight",
            type: "number",
            subcategories: [
                // Styrofoam
                { label: "Styrofoam cups", id: "csr_styrofoam_cups", type: "number" },
                { label: "Styrofoam plates", id: "csr_styrofoam_plates", type: "number" },
                { label: "Styrofoam containers", id: "csr_styrofoam_containers", type: "number" },
                { label: "Styrofoam packaging", id: "csr_styrofoam_packaging", type: "number" },
                { label: "Styrofoam fragments", id: "csr_styrofoam_fragments", type: "number" },
                // Hazardous
                { label: "Batteries", id: "csr_hazardous_batteries", type: "number" },
                { label: "Paint cans", id: "csr_hazardous_paint_cans", type: "number" },
                { label: "Chemical containers", id: "csr_hazardous_chemical_containers", type: "number" },
                { label: "Oil containers", id: "csr_hazardous_oil_containers", type: "number" },
                { label: "Pesticide containers", id: "csr_hazardous_pesticide_containers", type: "number" },
                { label: "Cleaning product containers", id: "csr_hazardous_cleaning_product_containers", type: "number" },
                { label: "Medical waste", id: "csr_hazardous_medical_waste", type: "number" },
                { label: "Electronic waste", id: "csr_hazardous_electronic_waste", type: "number" }
            ]
        },
        {
            label: "Miscellaneous (lbs)",
            id: "csr_miscellaneous_weight",
            type: "number",
            subcategories: [
                { label: "Rubber items", id: "csr_misc_rubber_items", type: "number" },
                { label: "Wood items", id: "csr_misc_wood_items", type: "number" },
                { label: "Ceramic items", id: "csr_misc_ceramic_items", type: "number" },
                { label: "Leather items", id: "csr_misc_leather_items", type: "number" },
                { label: "Electronic items", id: "csr_misc_electronic_items", type: "number" },
                { label: "Miscellaneous fragments", id: "csr_misc_fragments", type: "number" }
            ]
        },
        {
            label: "Derelict Items (lbs)",
            id: "csr_derelict_items_weight",
            type: "number",
            subcategories: [
                { label: "Derelict fishing gear", id: "csr_derelict_fishing_gear", type: "number" },
                { label: "Derelict boats", id: "csr_derelict_boats", type: "number" },
                { label: "Derelict vehicles", id: "csr_derelict_vehicles", type: "number" },
                { label: "Derelict furniture", id: "csr_derelict_furniture", type: "number" },
                { label: "Derelict appliances", id: "csr_derelict_appliances", type: "number" },
                { label: "Derelict building materials", id: "csr_derelict_building_materials", type: "number" },
                { label: "Derelict tools", id: "csr_derelict_tools", type: "number" },
                { label: "Derelict toys", id: "csr_derelict_toys", type: "number" }
            ]
        },
        // Habitat Restoration
        { label: "Number of Trees Planted", id: "csr_trees_planted", type: "number" },
        { label: "Square Feet of Invasive Species Removed", id: "csr_invasive_species_removed", type: "number" },
        { label: "Invasive Species Removed", id: "csr_invasive_species_names", type: "text" },
        { label: "Weight Collected (lbs)", id: "csr_invasive_species_weight", type: "number" },
        { label: "Native Plant Species Seeded", id: "csr_native_plants_seeded", type: "select" },
        { label: "Erosion Control Methods Used", id: "csr_erosion_control_methods", type: "text" },
        { label: "Additional notes (optional)", id: "csr_additional_notes", type: "text" },
        { label: "Number of Volunteers Involved in Habitat Work", id: "csr_volunteers_involved", type: "number" }
    ];

    // State
    let recognition, recognizing = false, sectionIdx = 0, subIdx = null;

    function supportsSpeechRecognition() {
        return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    }

    function getRecognition() {
        if ('webkitSpeechRecognition' in window) {
            return new webkitSpeechRecognition();
        } else if ('SpeechRecognition' in window) {
            return new SpeechRecognition();
        }
        return null;
    }

    function speak(text, cb) {
        if ('speechSynthesis' in window) {
            if (recognition && recognizing) recognition.abort();
            const utter = new SpeechSynthesisUtterance(text);
            utter.onend = function () {
                if (cb) cb();
            };
            window.speechSynthesis.speak(utter);
        } else if (cb) {
            cb();
        }
    }

    function setStatus(msg) {
        const status = document.getElementById('csr-voice-status');
        if (status) status.textContent = msg;
    }

    function fillField(id, value) {
        const el = document.getElementById(id);
        if (!el) return;
        el.value = value;
        el.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function getCurrentPrompt() {
        const section = formSections[sectionIdx];
        if (!section) return null;
        if (section.subcategories && subIdx !== null && subIdx < section.subcategories.length) {
            return section.subcategories[subIdx];
        }
        return section;
    }

    function promptNext() {
        // Move to next subcategory or section
        const section = formSections[sectionIdx];
        if (section && section.subcategories && subIdx !== null) {
            subIdx++;
            if (subIdx < section.subcategories.length) {
                promptCurrent();
                return;
            } else {
                subIdx = null;
                sectionIdx++;
                promptNext();
                return;
            }
        } else {
            sectionIdx++;
            subIdx = null;
            if (sectionIdx < formSections.length) {
                promptCurrent();
            } else {
                setStatus("All fields complete. You may submit the form.");
                speak("All fields complete. You may submit the form.");
                recognizing = false;
            }
        }
    }

    function promptCurrent() {
        const promptObj = getCurrentPrompt();
        if (!promptObj) return;
        let spokenLabel = promptObj.label.replace(/\(lbs\)/i, "pounds").replace(/lbs/i, "pounds");
        setStatus(promptObj.label);
        speak(spokenLabel, () => {
            if (supportsSpeechRecognition()) {
                startRecognition();
            }
        });
    }

    function startRecognition() {
        if (!supportsSpeechRecognition()) {
            setStatus("Voice input not supported in this browser.");
            return;
        }
        if (!recognition) recognition = getRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognizing = true;
        recognition.start();

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            handleSpeechResult(transcript);
        };
        recognition.onerror = function (event) {
            setStatus("Voice error: " + event.error);
            recognizing = false;
        };
        recognition.onend = function () {
            if (recognizing) {
                // Wait for speechSynthesis to finish before restarting
                if (!window.speechSynthesis.speaking) {
                    recognition.start();
                }
            }
        };
    }

    function stopRecognition() {
        if (recognition) recognition.stop();
        recognizing = false;
        setStatus("Voice input stopped.");
    }

    // Comprehensive keyword-based navigation for direct field/subcategory access
    const keywordMap = [
        // Plastic subcategories
        { keywords: ['water bottles', 'drink bottles', 'soda bottles', 'PET bottles', 'plastic drink containers', 'plastic soda containers', 'empty bottles', 'clear plastic bottles', 'plastic beverage bottles', 'plastic juice bottles', 'recyclable bottles', 'plastic bottle waste'], id: 'csr_plastic_bottles' },
        { keywords: ['plastic caps', 'bottle tops', 'cap tops', 'screw tops', 'twist caps', 'plastic lids', 'bottle lids', 'drink caps', 'soda caps', 'pop caps', 'juice bottle caps', 'top of bottle', 'bottle closures'], id: 'csr_plastic_bottle_caps' },
        { keywords: ['plastic straws', 'drink straws', 'bendy straws', 'disposable straws', 'coffee stirrers', 'drink stirrers', 'plastic stirrers', 'cocktail stirrers', 'straw sticks', 'stirring sticks', 'beverage stirrers', 'coffee sticks', 'plastic coffee sticks', 'bar stirrers'], id: 'csr_plastic_straws_stirrers' },
        { keywords: ['grocery bags', 'shopping bags', 'plastic shopping bags', 'store bags', 'retail bags', 'plastic sacks', 'carry bags', 'disposable bags', 'thin plastic bags', 'plastic grocery sacks', 'supermarket bags', 'plastic totes', 'plastic carriers', 'soft plastic bags'], id: 'csr_plastic_bags' },
        { keywords: ['candy wrappers', 'snack wrappers', 'plastic food wrappers', 'chip bags', 'granola bar wrappers', 'chocolate wrappers', 'gum wrappers', 'energy bar wrappers', 'food packaging', 'single-use wrappers', 'snack packaging', 'junk food wrappers', 'treat wrappers', 'plastic wrappers'], id: 'csr_plastic_food_wrappers' },
        { keywords: ['plastic forks', 'plastic spoons', 'plastic knives', 'disposable utensils', 'takeout utensils', 'plastic cutlery', 'plastic silverware', 'throwaway utensils', 'single-use utensils', 'plastic eating tools', 'to-go utensils', 'plastic dining ware'], id: 'csr_plastic_utensils' },
        { keywords: ['plastic cups', 'disposable cups', 'drink cups', 'coffee cups', 'soda cups', 'to-go cups', 'takeaway cups', 'beverage cups', 'cold drink cups', 'plastic lids', 'drink lids', 'coffee cup lids', 'soda cup lids', 'takeaway lids', 'disposable lids', 'cup tops'], id: 'csr_plastic_cups_lids' },
        { keywords: ['plastic rings', 'can rings', 'six pack holders', 'soda can rings', 'beverage rings', 'plastic can holders', 'six can rings', 'beer rings', 'drink can rings', 'soda rings', 'plastic six pack rings', 'ring carriers', 'can loops'], id: 'csr_plastic_six_pack_rings' },
        { keywords: ['plastic particles', 'tiny plastics', 'small plastic pieces', 'plastic bits', 'micro plastic', 'micro plastic particles', 'shredded plastic', 'plastic dust', 'plastic fragments', 'broken down plastics', 'invisible plastics', 'microscopic plastic', 'micro debris'], id: 'csr_plastic_microplastics' },
        { keywords: ['plastic toys', 'kids toys', 'childrens toys', 'toy parts', 'broken toys', 'old toys', 'small toys', 'plastic action figures', 'toy pieces', 'toy figurines', 'plastic dolls', 'toy cars', 'toy animals', 'baby toys'], id: 'csr_plastic_toys' },
        { keywords: ['plastic containers', 'food containers', 'takeout containers', 'to-go containers', 'storage containers', 'disposable containers', 'meal prep containers', 'lunch containers', 'leftover containers', 'clamshell containers', 'plastic tubs', 'deli containers', 'plastic food boxes', 'plastic trays'], id: 'csr_plastic_containers_non_food' },
        { keywords: ['rigid plastics', 'tough plastics', 'solid plastics', 'hard plastic items', 'durable plastics', 'thick plastic', 'hard plastic materials', 'molded plastics', 'plastic hardware', 'hard plastic parts', 'sturdy plastic', 'strong plastics'], id: 'csr_plastic_hard_plastics' },
        { keywords: ['plastic packaging', 'plastic wrap', 'packing materials', 'packaging waste', 'food packaging', 'shipping packaging', 'plastic film', 'product packaging', 'wrapping materials', 'bubble wrap', 'plastic mailers', 'packaging plastics', 'disposable packaging', 'sealed plastic wrappers'], id: 'csr_plastic_packaging_materials' },
        { keywords: ['plastic fishing nets', 'old fishing nets', 'discarded nets', 'ghost nets', 'nylon nets', 'fishing gear', 'netting', 'tangled nets', 'fish nets', 'marine nets', 'plastic nets', 'fishing line nets', 'ocean nets', 'sea nets'], id: 'csr_plastic_fishing_nets' },
        // Paper subcategories
        { keywords: ['old newspapers', 'newspaper', 'paper news', 'daily paper', 'newsprint', 'recycled newspaper', 'printed news', 'news pages', 'paper sheets', 'local paper', 'Sunday paper', 'weekly newspaper', 'paper articles', 'news clippings'], id: 'csr_paper_newspapers' },
        { keywords: ['magazine', 'old magazines', 'paper magazines', 'glossy magazines', 'recycled magazines', 'printed magazines', 'weekly magazines', 'monthly issues', 'fashion magazines', 'news magazines', 'entertainment magazines', 'magazine pages', 'publication issues'], id: 'csr_paper_magazines' },
        { keywords: ['paper flyers', 'ads', 'advertisements', 'leaflets', 'handouts', 'printed ads', 'circulars', 'junk mail', 'promotional flyers', 'marketing flyers', 'event flyers', 'mailers', 'brochures', 'paper ads'], id: 'csr_paper_flyers_brochures' },
        { keywords: ['plastic food packaging', 'takeout packaging', 'to-go packaging', 'food wrappers', 'food containers', 'snack packaging', 'meal packaging', 'restaurant packaging', 'disposable food packaging', 'fast food packaging', 'food bags', 'food trays', 'food wrap', 'grocery packaging'], id: 'csr_paper_food_packaging' },
        { keywords: ['cardboard boxes', 'corrugated cardboard', 'packing boxes', 'shipping boxes', 'cardboard packaging', 'paperboard', 'recycled cardboard', 'cardboard containers', 'delivery boxes', 'moving boxes', 'brown boxes', 'boxboard', 'cardboard sheets'], id: 'csr_paper_cardboard' },
        { keywords: ['grocery paper bags', 'shopping paper bags', 'brown paper bags', 'kraft bags', 'recycled paper bags', 'lunch paper bags', 'paper carry bags', 'paper sacks', 'takeout paper bags', 'paper gift bags', 'paper tote bags', 'store paper bags'], id: 'csr_paper_bags' },
        { keywords: ['paper napkins', 'disposable napkins', 'serviettes', 'dinner napkins', 'table napkins', 'recycled napkins', 'tissue napkins', 'restaurant napkins', 'fast food napkins', 'lunch napkins', 'paper serviettes', 'eating napkins'], id: 'csr_paper_napkins_tissues' },
        { keywords: ['paper notebooks', 'school notebooks', 'spiral notebooks', 'composition books', 'recycled notebooks', 'writing notebooks', 'lined notebooks', 'student notebooks', 'note pads', 'paper pads', 'class notebooks', 'paper journals'], id: 'csr_paper_notebooks_loose' },
        { keywords: ['cigarette boxes', 'empty cigarette packs', 'cigarette cartons', 'tobacco packs', 'cig packs', 'cigarette wrappers', 'used cigarette packs', 'cigarette packaging', 'smoking packs', 'cigarette containers'], id: 'csr_paper_cigarette_packs' },
        { keywords: ['paper receipts', 'printed receipts', 'store receipts', 'shopping receipts', 'sales slips', 'transaction slips', 'purchase receipts', 'checkout receipts', 'paper proof of purchase', 'thermal receipts', 'receipt paper', 'point of sale receipts'], id: 'csr_paper_receipts' },
        { keywords: ['to-go coffee cups', 'disposable coffee cups', 'paper coffee cups', 'plastic coffee cups', 'takeaway coffee cups', 'hot drink cups', 'coffee mugs', 'travel coffee cups', 'single-use coffee cups', 'latte cups', 'espresso cups', 'coffee containers'], id: 'csr_paper_coffee_cups' },
        // Derelict subcategories
        { keywords: ['abandoned fishing gear', 'lost fishing nets', 'ghost gear', 'derelict nets', 'discarded fishing lines', 'old fishing traps', 'marine debris', 'fishing equipment waste', 'ghost nets', 'leftover fishing gear', 'ocean fishing waste', 'fishing debris', 'underwater gear', 'sea trash'], id: 'csr_derelict_fishing_gear' },
        { keywords: ['abandoned boats', 'sunken boats', 'wrecked boats', 'old boats', 'ghost boats', 'derelict vessels', 'marine wreckage', 'boat debris', 'decaying boats', 'unused boats', 'discarded boats', 'neglected boats', 'watercraft waste', 'shipwrecks', 'maritime debris'], id: 'csr_derelict_boats' },
        { keywords: ['abandoned vehicles', 'junk cars', 'old cars', 'wrecked vehicles', 'broken down vehicles', 'discarded cars', 'derelict cars', 'car debris', 'rusted vehicles', 'unused vehicles', 'vehicle waste', 'nonfunctional cars', 'vehicle junk', 'scrap vehicles', 'totaled cars'], id: 'csr_derelict_vehicles' },
        { keywords: ['abandoned furniture', 'dumped furniture', 'old furniture', 'broken furniture', 'discarded furniture', 'unwanted furniture', 'trashed furniture', 'furniture waste', 'used furniture', 'furniture debris', 'thrown out furniture', 'left behind furniture', 'junk furniture', 'bulky furniture'], id: 'csr_derelict_furniture' },
        { keywords: ['abandoned appliances', 'broken appliances', 'old appliances', 'discarded appliances', 'junk appliances', 'unwanted appliances', 'trashed appliances', 'used appliances', 'appliance waste', 'household appliance debris', 'dumped appliances', 'nonworking appliances', 'large appliances', 'white goods'], id: 'csr_derelict_appliances' },
        { keywords: ['abandoned building materials', 'construction debris', 'building waste', 'leftover materials', 'old wood', 'broken bricks', 'scrap drywall', 'discarded lumber', 'unused construction supplies', 'building rubble', 'junk construction materials', 'derelict construction waste', 'demolition debris', 'construction trash', 'renovation waste'], id: 'csr_derelict_building_materials' },
        { keywords: ['abandoned tools', 'broken tools', 'old tools', 'discarded tools', 'junk tools', 'rusted tools', 'unused tools', 'damaged tools', 'tool waste', 'lost tools', 'trashed tools', 'derelict equipment', 'worn-out tools', 'unusable tools'], id: 'csr_derelict_tools' },
        { keywords: ['abandoned toys', 'broken toys', 'discarded toys', 'old toys', 'junk toys', 'unwanted toys', 'trashed toys', 'lost toys', 'toy debris', 'damaged toys', 'unused toys', 'derelict playthings', 'toy waste', 'ruined toys'], id: 'csr_derelict_toys' },
        // Miscellaneous subcategories
        { keywords: ['rubber products', 'rubber waste', 'old rubber', 'rubber pieces', 'rubber scraps', 'discarded rubber', 'used rubber', 'rubber materials', 'rubber parts', 'rubber debris', 'rubber bands', 'rubber gloves', 'rubber tubing', 'rubber sheets'], id: 'csr_misc_rubber_items' },
        { keywords: ['wood waste', 'wooden items', 'scrap wood', 'wood pieces', 'wooden scraps', 'lumber', 'discarded wood', 'wood debris', 'broken wood', 'wood furniture', 'treated wood', 'natural wood', 'old wood', 'wooden materials'], id: 'csr_misc_wood_items' },
        { keywords: ['ceramics', 'ceramic waste', 'ceramic pieces', 'broken ceramics', 'ceramic dishes', 'ceramic plates', 'ceramic mugs', 'ceramic cups', 'pottery', 'shattered ceramics', 'old ceramics', 'ceramic tiles', 'discarded ceramics', 'clay items'], id: 'csr_misc_ceramic_items' },
        { keywords: ['leather products', 'leather goods', 'old leather', 'used leather', 'leather waste', 'discarded leather', 'leather scraps', 'leather material', 'worn leather', 'leather accessories', 'leather clothing', 'leather bags', 'leather shoes', 'leather belts'], id: 'csr_misc_leather_items' },
        { keywords: ['electronics', 'electronic waste', 'e-waste', 'old electronics', 'used electronics', 'broken electronics', 'electronic devices', 'discarded gadgets', 'tech waste', 'electronic equipment', 'digital devices', 'electronic junk', 'electronic components', 'dead electronics'], id: 'csr_misc_electronic_items' },
        { keywords: ['random debris', 'small pieces', 'tiny fragments', 'miscellaneous pieces', 'mixed materials', 'assorted scraps', 'unknown debris', 'bits and pieces', 'leftover materials', 'unclassified waste', 'broken bits', 'misc items', 'shattered pieces', 'debris fragments'], id: 'csr_misc_fragments' },
        // Habitat/other
        { keywords: ['trees', 'saplings planted', 'young trees', 'number of trees', 'tree planting', 'planted saplings', 'trees grown', 'reforested trees', 'planted trees', 'replanting trees', 'new trees', 'tree count'], id: 'csr_trees_planted' },
        { keywords: ['invasive species', 'invasive plants', 'invasive weeds', 'removed invasive species', 'pulled invasive plants', 'weed removal', 'invasive plant cleanup', 'species removed', 'cleared invasive plants', 'extracted invasives', 'eliminated invasive species', 'non-native species removed', 'invasive brush removal'], id: 'csr_invasive_species_names' },
        { keywords: ['kudzu', 'English ivy', 'Japanese knotweed', 'garlic mustard', 'honeysuckle', 'privet', 'multiflora rose', 'bamboo', 'stiltgrass', 'purple loosestrife', 'water hyacinth', 'hydrilla', 'giant reed', 'autumn olive', 'tree of heaven', 'Canada thistle', 'spotted knapweed', 'Johnson grass', 'Chinese tallow', 'Russian olive', 'yellow star-thistle', 'tamarisk', 'Brazilian pepper', 'cogongrass', 'mile-a-minute vine'], id: 'csr_invasive_species_names' },
        { keywords: ['weight removed', 'pounds of invasive species', 'invasive weight', 'total weight pulled', 'amount of plants removed', 'invasive plant weight', 'biomass removed', 'how many pounds', 'how much was removed', 'invasive species mass', 'total biomass', 'removed vegetation weight', 'cleared brush weight', 'plant weight'], id: 'csr_invasive_species_weight' },
        { keywords: ['native plant', 'native plants', 'local plant', 'local species', 'indigenous plant', 'regional plant', 'native vegetation', 'native flora', 'natural plant', 'native species', 'native greenery', 'wild plant', 'local flora'], id: 'csr_native_plants_seeded' },
        { keywords: ['volunteers', 'people involved', 'helpers', 'team members', 'number of volunteers', 'participants', 'volunteer count', 'crew members', 'cleanup crew', 'group members', 'workers', 'contributing people', 'people who helped', 'community members', 'volunteer workers'], id: 'csr_volunteers_involved' }
    ];

    function findFieldIdFromSpeech(speech) {
        const lower = speech.toLowerCase();
        for (const entry of keywordMap) {
            for (const keyword of entry.keywords) {
                if (lower.includes(keyword)) {
                    return entry.id;
                }
            }
        }
        return null;
    }

    // New: Voice assistant starts with navigation prompt
    function startVoiceNavigation() {
        setStatus("Where can I help you to navigate to?");
        speak("Where can I help you to navigate to?", () => {
            if (supportsSpeechRecognition()) {
                startRecognition();
            }
        });
    }

    // Map normalized names to section/subcategory indices for navigation
    function buildNavigationMap() {
        const navMap = {};
        // Main categories
        for (let i = 0; i < formSections.length; i++) {
            const section = formSections[i];
            // Normalize label for matching
            navMap[normalizeNavKey(section.label)] = { sectionIdx: i, subIdx: null };
            // Subcategories
            if (section.subcategories) {
                for (let j = 0; j < section.subcategories.length; j++) {
                    navMap[normalizeNavKey(section.subcategories[j].label)] = { sectionIdx: i, subIdx: j };
                }
            }
        }
        return navMap;
    }

    function normalizeNavKey(label) {
        return label.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    }

    // Build navigation map once
    const navigationMap = buildNavigationMap();

    function handleSpeechResult(speech) {
        // If we are at the navigation prompt, jump to the field/subcategory if possible
        if (statusIsNavigationPrompt()) {
            // Try to match to a category or subcategory by normalized label
            const navKey = normalizeNavKey(speech);
            let navTarget = navigationMap[navKey];

            // If not found, try partial match (contains)
            if (!navTarget) {
                for (const key in navigationMap) {
                    if (navKey && key.includes(navKey)) {
                        navTarget = navigationMap[key];
                        break;
                    }
                }
            }

            // If still not found, try keywordMap as fallback
            if (!navTarget) {
                const jumpId = findFieldIdFromSpeech(speech);
                if (jumpId) {
                    for (let i = 0; i < formSections.length; i++) {
                        const section = formSections[i];
                        if (section.id === jumpId) {
                            navTarget = { sectionIdx: i, subIdx: null };
                            break;
                        }
                        if (section.subcategories) {
                            for (let j = 0; j < section.subcategories.length; j++) {
                                if (section.subcategories[j].id === jumpId) {
                                    navTarget = { sectionIdx: i, subIdx: j };
                                    break;
                                }
                            }
                        }
                        if (navTarget) break;
                    }
                }
            }

            if (navTarget) {
                sectionIdx = navTarget.sectionIdx;
                subIdx = navTarget.subIdx;
                promptCurrent();
                return;
            } else {
                setStatus("Sorry, I couldn't find that field. Please try again.");
                speak("Sorry, I couldn't find that field. Please try again.", startVoiceNavigation);
                return;
            }
        }

        // Allow skip/back
        if (/skip/.test(speech)) {
            promptNext();
            return;
        }
        if (/back/.test(speech)) {
            if (subIdx !== null && subIdx > 0) {
                subIdx--;
            } else if (sectionIdx > 0) {
                sectionIdx--;
                const prevSection = formSections[sectionIdx];
                subIdx = prevSection.subcategories ? prevSection.subcategories.length - 1 : null;
            }
            promptCurrent();
            return;
        }
        // Expand subcategories if user says "expand" or "subcategories"
        if (/expand|subcategory|subcategories/.test(speech)) {
            const section = formSections[sectionIdx];
            if (section && section.subcategories) {
                subIdx = 0;
                promptCurrent();
                return;
            }
        }
        // Keyword navigation: jump to field if keyword detected
        const jumpId = findFieldIdFromSpeech(speech);
        if (jumpId) {
            for (let i = 0; i < formSections.length; i++) {
                const section = formSections[i];
                if (section.id === jumpId) {
                    sectionIdx = i;
                    subIdx = null;
                    promptCurrent();
                    return;
                }
                if (section.subcategories) {
                    for (let j = 0; j < section.subcategories.length; j++) {
                        if (section.subcategories[j].id === jumpId) {
                            sectionIdx = i;
                            subIdx = j;
                            promptCurrent();
                            return;
                        }
                    }
                }
            }
        }
        // Parse value and fill for both main and subcategory fields
        const promptObj = getCurrentPrompt();
        if (!promptObj) return;

        // Always set today's date for the date field
        if (promptObj.type === "date") {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const todayStr = `${yyyy}-${mm}-${dd}`;
            fillField(promptObj.id, todayStr);
            promptNext();
            return;
        }

        let value = speech;
        if (promptObj.type === "number") {
            // Try to convert number words to digits (e.g., "one" -> 1)
            const numberWords = {
                "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
                "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
                "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14, "fifteen": 15,
                "sixteen": 16, "seventeen": 17, "eighteen": 18, "nineteen": 19, "twenty": 20
            };
            let match = speech.match(/[\d\.]+/);
            if (!match) {
                // Try to match number words
                const word = speech.trim().toLowerCase().split(/\s+/)[0];
                if (numberWords.hasOwnProperty(word)) {
                    value = numberWords[word];
                } else {
                    setStatus("Please say a number.");
                    speak("Please say a number.", () => {
                        startRecognition();
                    });
                    return;
                }
            } else {
                value = match[0];
            }
        } else if (promptObj.type === "select") {
            value = speech.split(' ')[0];
        }
        fillField(promptObj.id, value);
        promptNext();
    }

    // Helper to check if we're at the navigation prompt
    function statusIsNavigationPrompt() {
        const status = document.getElementById('csr-voice-status');
        if (!status) return false;
        return status.textContent && status.textContent.toLowerCase().includes("where can i help you");
    }

    // Add: total litter calculator
    function calculateTotalLitter() {
      const weightEl = document.getElementById('csr_unsorted_litter_weight');
      const bagsEl = document.getElementById('csr_unsorted_bags_count');

      let unsortedWeight = parseFloat(weightEl?.value || 0);
      const unsortedBags = parseFloat(bagsEl?.value || 0);

      // Step 2: derive unsorted weight from bags only if weight is 0/empty
      if ((!unsortedWeight || unsortedWeight === 0) && unsortedBags > 0) {
        unsortedWeight = unsortedBags * 10;
        if (weightEl) weightEl.value = unsortedWeight.toFixed(2);
      }

      // Only sum weight fields (exclude any bag counters)
      const otherWeightFields = [
        // exclude 'csr_unsorted_bags_count' and avoid double-reading 'csr_unsorted_litter_weight'
        'csr_plastic_waste_weight',
        'csr_paper_waste_weight',
        'csr_food_waste_weight',
        'csr_metal_waste_weight',
        'csr_glass_waste_weight',
        'csr_cigarette_litter_weight',
        'csr_textiles_weight',
        'csr_medical_waste_weight',
        'csr_sanitary_products_weight',
        'csr_fishing_gear_weight',
        'csr_styrofoam_hazardous_waste_weight',
        'csr_miscellaneous_weight',
        'csr_derelict_items_weight'
      ];

      let total = 0;
      total += unsortedWeight;
      otherWeightFields.forEach(id => {
        const val = parseFloat(document.getElementById(id)?.value || 0);
        total += val;
      });

      const totalEl = document.getElementById('csr_total_litter_weight');
      if (totalEl) totalEl.value = total.toFixed(2);
    }

    // UI event handlers
    document.addEventListener('DOMContentLoaded', function () {
        const btn = document.getElementById('csr-voice-btn');
        if (!btn) return;
        btn.setAttribute('aria-pressed', 'false');
        btn.addEventListener('click', function () {
            if (recognizing) {
                stopRecognition();
                btn.setAttribute('aria-pressed', 'false');
            } else {
                btn.setAttribute('aria-pressed', 'true');
                startVoiceNavigation();
            }
        });

        // Hotword: "start assistant"
        if (supportsSpeechRecognition()) {
            document.addEventListener('keydown', function (e) {
                if (e.ctrlKey && e.key === ' ') {
                    sectionIdx = 0;
                    subIdx = null;
                    promptCurrent();
                }
            });
        }
    });
})();

// Hide voice button for CSR form Until feature is ready
document.addEventListener('DOMContentLoaded', function() {
    const voiceBtn = document.getElementById('csr-voice-btn');
    if (voiceBtn) voiceBtn.style.display = 'none';
});