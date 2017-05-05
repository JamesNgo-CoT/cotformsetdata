CotForm.prototype.setData = function(data) {
	// STANDARD FIELD OPERATION
	function standardFieldOp(field, val) {
		if (field.length === 1) { // SINGLE FIELD ELMENT
			if (Array.isArray(val)) { // MULTIPLE VALUE ELEMENT - AKA SELECT
				for (var i = 0, l = val.length; i < l; i++) {
					field.find('[value="' + val[i] + '"]').prop('selected', true);
				}
			} else { // STANDARD TEXT-LIKE FIELD
				field.val(val);
			}
		} else { // MULTIPLE FIELD ELEMENT - GROUP OF CHECKBOXS, RADIO BUTTONS
			if (Array.isArray(val)) {
				for (var i = 0, l = val.length; i < l; i++) {
					field.filter('[value="' + val[i] + '"]').prop('checked', true);
				}
			} else { // SINGLE FIELD ELEMENT - STAND ALONE CHECKBOX, RADIO BUTTON
				field.filter('[value="' + val + '"]').prop('checked', true);
			}
		}
		// PLUGIN REBUILD
		field.filter('.multiselect').multiselect('rebuild');
		field.filter('.daterangevalidation').daterangepicker('update');
	}
	// GO THROUGH DATA
	var form = $('#' + this.cotForm.id);
	for (var k in data) {
		if (k === 'rows') { // GRID FIELDS
			for (var i = 0, l = data[k].length; i < l; i++) {
				if (i > 0) { // ADD ROW IF NEEDED
					var fields = $();
					for (var k2 in data[k][i]) {
						fields = fields.add(form.find('[name="row[0].' + k2 + '"]'));
					}
					fields.closest('tr').find('button.grid-add').trigger('click');
				}
				for (var k2 in data[k][i]) { // ASSIGN VALUES
					standardFieldOp(form.find('[name="row[' + i + '].' + k2 + '"]'), data[k][i][k2]);
				}
			}
		} else { // STANDARD FIELDS
			standardFieldOp(form.find('[name="' + k + '"]'), data[k]);
		}
	}
};