CotForm.prototype.setData = function(data) {
	// STANDARD FIELD OPERATION
	function standardFieldOp(field, data) {
		if (field.length === 1) { // SINGLE FIELD ELMENT
			if (Array.isArray(data)) { // MULTIPLE VALUE ELEMENT - AKA SELECT
				for (var i = 0, l = data.length; i < l; i++) {
					field.find('[value="' + data[i] + '"]').prop('selected', true);
				}
			} else { // STANDARD TEXT-LIKE FIELD
				field.val(data);
			}
		} else { // MULTIPLE FIELD ELEMENT - GROUP OF CHECKBOXS, RADIO BUTTONS
			if (Array.isArray(data)) {
				for (var i = 0, l = data.length; i < l; i++) {
					field.filter('[value="' + data[i] + '"]').prop('checked', true);
				}
			} else { // SINGLE FIELD ELEMENT - STAND ALONE CHECKBOX, RADIO BUTTON
				field.filter('[value="' + data + '"]').prop('checked', true);
			}
		}
		// PLUGIN REBUILD
		if (field.is('.multiselect')) {
			field.multiselect('rebuild');
		}
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