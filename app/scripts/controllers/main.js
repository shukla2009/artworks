'use strict';

angular.module('artworksApp').controller('MainCtrl', function($scope, DataService, $modal) {

	$scope.artWorks = [];
	$scope.mediums = DataService.mediums;
	$scope.materials = DataService.materials;
	$scope.filter = {};

	$scope.nameFilter = function(artWork) {
		if (!$scope.filter.text) {
			return true;
		}
		return artWork.artist.toLowerCase().indexOf($scope.filter.text.toLowerCase()) > -1;
	};
	$scope.dimensionsInCm = [ {
		id : true,
		label : 'CM'
	}, {
		id : false,
		label : 'INCHES'
	}

	];
	function load() {
		DataService.getArtWorks().then(function(result) {
			var urls = result.data.urls;
			$scope.artWorks = [];
			angular.forEach(urls, function(url) {
				DataService.getData(url).then(function(artWork) {
					DataService.getData(artWork.data.materials).then(function(mat) {
						artWork.data.mats = mat.data.urls;
						$scope.artWorks.push(artWork.data);
					});
				});
			});
		});
	}
	load();
	$scope.createArtWork = function() {
		DataService.createArtWork({
			"artist" : "",
			"description" : "",
			"dimension1" : 0,
			"dimension2" : 0,
			"dimension3" : 0,
			"dimensions_in_cm" : true,
			"includes_vat" : false,
			"materials" : "",
			"medium" : "http://54.77.217.175/mediums/2",
			"price" : 0,
			"title" : "",
			"url" : "",
			"vat" : 0,
			"year" : 2014
		}).then(function(result) {
			DataService.getData(result.headers().location).then(function(artWork) {
				artWork.data.mats = [];
				$scope.artWorks.unshift(artWork.data);
				openUpdateDialog(artWork.data);
			});
		});

	};

	$scope.editAtrWork = function(w) {
		openUpdateDialog(w);
	};

	$scope.deleteArtWork = function(w) {
		DataService.deleteArtWork(w.id);
		$scope.artWorks.splice($scope.artWorks.indexOf(w), 1);
	};

	function openUpdateDialog(artWork) {
		var modelContent = {};
		modelContent.templateUrl = 'views/update.html';
		modelContent.backdrop = 'static';
		modelContent.controller = 'UpdateCtrl';
		modelContent.resolve = {
			artWork : function() {
				return artWork;
			},
		};
		$modal.open(modelContent);

	}

	DataService.getData('http://54.77.217.175/materials').then(function(result) {
		angular.forEach([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ], function(url) {
			// only loading 50 tags
			if (!DataService.materials['http://54.77.217.175/materials/' + url]) {
				DataService.getMaterial('http://54.77.217.175/materials/' + url);
			}
		});

	});

});
