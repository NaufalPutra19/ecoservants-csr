// CSR Category Card Selection (Issue #7)
//
// Category cards are UI-only, no new form field, no new POST data, and
// no changes needed in form-handler.php. Checking a card just shows the
// existing detail block for that category (weight input plus subcategory
// fieldset), unchecking hides it again. Values already entered in a
// hidden block are preserved, not cleared, consistent with how Back
// navigation already preserves data in the guided wrapper (#6).
//
// Subcategory picker redesign (pinwheel or grid) is Issue #8, this only
// controls which category's existing detail block is visible.

(function () {
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    ready(function () {
        var toggles = document.querySelectorAll('.csr-category-toggle');
        if (toggles.length === 0) {
            return;
        }

        function detailBlockFor(category) {
            return document.querySelector('[data-category-detail="' + category + '"]');
        }

        function syncVisibility(toggle) {
            var category = toggle.getAttribute('data-category');
            var detail = detailBlockFor(category);
            if (!detail) {
                return;
            }
            detail.style.display = toggle.checked ? '' : 'none';

            var card = toggle.closest('.csr-category-card');
            if (card) {
                card.classList.toggle('csr-category-card-selected', toggle.checked);
            }
        }

        // Hide every detail block by default, only selected cards reveal theirs.
        toggles.forEach(function (toggle) {
            syncVisibility(toggle);
            toggle.addEventListener('change', function () {
                syncVisibility(toggle);
            });
        });
    });
})();
