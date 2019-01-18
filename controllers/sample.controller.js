/*
 *	Controllers for testing purposes.
 *
 */

// Sends a JSON example of a group 
exports.send_group_json = function (req, res) {
    res.send(
		{
    		'name': 'UNSE',
            'description': 'PARCIALES VIEJOS'
        }
    );
};

// Sends a JSON example of an activity
exports.send_activity_json = function (req, res) {
    res.send(
    	{
    		'name': 'Parcial Algebra 2',
		    'description': 'ninguna',
		    'date': '12/04/2015',
		    'priority': '3',
		    'group': 'UNSE'
    	}
	);
};
