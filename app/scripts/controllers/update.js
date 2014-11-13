'use strict';

angular.module('artworksApp').controller('UpdateCtrl', function($scope, $modalInstance, artWork, DataService) {
	$scope.mediums = DataService.mediums;
	$scope.materials = DataService.materials;
	$scope.materialsArray = DataService.materialsArray;
	$scope.mats;
	$scope.dimensionsInCm = [ {
		id : true,
		label : 'CM'
	}, {
		id : true,
		label : 'INCHES'
	}

	];
	$scope.artWork = artWork;
	$scope.mats = $scope.artWork.mats;
	delete $scope.artWork.mats;
	$scope.$watch('artWork', function(n, o) {
		if (!!n && n !== 0) {
			DataService.updateArtWork(n.id, n);
		}
	}, true);

	$scope.close = function() {
		$modalInstance.close();
	};
	$scope.mat = null;

	$scope.createMaterialAndAdd = function() {
		if (!!$scope.mat) {
			DataService.createMaterial({
				name : $scope.mat
			}).then(function(result) {
				if (!!$scope.mats) {
					DataService.getMaterial(result.headers().location);
					$scope.mats.push(result.headers().location);
					DataService.updateMaterials($scope.artWork.id, result.headers().location);
				}
			}, function(err) {
				angular.forEach($scope.materialsArray, function(mat) {
					if (!!$scope.mats && (mat.name === $scope.mat)) {
						$scope.mats.push(mat.url);
						DataService.updateMaterials($scope.artWork.id, mat.url);
					}
				});
			});
		}
	};
	$scope.removeMaterial = function(mat) {
		if (!!$scope.mats) {
			$scope.mats.splice($scope.mats.indexOf(mat), 1);
			DataService.deleteMaterials($scope.artWork.id, mat);
		}

	};
});
