function start_vector(positions, value) {
    var vector = [];

    for (var i = 0; i < positions; i++) {
        vector.push(value);
    }

    return vector;
}

function start_matrix_notes() {
    var matrix = [];

    for (var i = 0; i < 8; i++) {
        matrix.push(start_vector(5, 0));
    }

    return matrix;
}

function render_matrix_notes(matrix) {
    var css_node_selected_class = [
        'note-space-selected-1', 'note-space-selected-2',
        'note-space-selected-3', 'note-space-selected-4',
        'note-space-selected-5'
    ];

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 5; j++) {

            if (matrix[i][j] === 0)
                document.getElementById('note-space-' + (Number(i) + 1) + '-' + (Number(j) + 1))
                    .classList.remove(css_node_selected_class[j])
            else 
                document.getElementById('note-space-' + (Number(i) + 1) + '-' + (Number(j) + 1))
                    .classList.add(css_node_selected_class[j])

        }
    }
}

function scroll_matrix_notes(matrix, new_notes, callback) {

    for (var i = 0; i < 5; i++) {
        for (var j = 7; j > -1; j--) {
            if (j == 0) {
                if (new_notes != null)
                    matrix[j][i] = new_notes[i];
                else
                    matrix[j][i] = 0;
            }
            else if (j == 7)
                matrix[j][i] = 0;
            else
                matrix[j][i] = matrix[Number(j) - 1][i]
        }
    }
    
    callback()
}

function add_notes_to_matrix(matrix, notes) {

    for (var i in notes) {
        matrix[0][i] = notes[i];
    }

}

const CLOCK_TIMER = 500;
const MATRIX_NOTE = start_matrix_notes();

render_matrix_notes(MATRIX_NOTE);

var notes = [
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0],
];

var notes_idx = -1;
setInterval(() => {
    notes_idx++;
    var new_notes = null;

    if (notes_idx < notes.length)
        new_notes = notes[notes_idx];

    scroll_matrix_notes(MATRIX_NOTE, new_notes, () => {
        render_matrix_notes(MATRIX_NOTE)
    });
}, CLOCK_TIMER);