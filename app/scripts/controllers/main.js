'use strict';

angular.module('artworksApp').controller('MainCtrl', function($scope, DataService, $modal) {

	$scope.artWorks = [];
	$scope.mediums = DataService.mediums;
	$scope.materials = DataService.materials;
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
						angular.forEach(mat.data.urls, function(mUrl) {
							if (!DataService.materials[mat.data.urls]) {
								DataService.getMaterial(mUrl);
							}

						});
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
		var modelInstance = $modal.open(modelContent);
		modelInstance.result.then(function() {
			load();
		});
	}

});
