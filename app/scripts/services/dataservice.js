'use strict';

angular.module('artworksApp').service('DataService', function Dataservice($http) {
	this.getArtWorks = function() {
		return $http.get('http://54.77.217.175/artworks');
	};

	this.getData = function(url) {
		return $http.get(url);
	};
	this.deleteArtWork = function(id) {
		return $http.delete('http://54.77.217.175/artworks/' + id);
	};
	this.createArtWork = function(work) {
		return $http.post('http://54.77.217.175/artworks', work);

	};
	this.updateArtWork = function(id, artWork) {
		return $http.put('http://54.77.217.175/artworks/' + id, artWork);
	};
	var self = this;
	self.materials = {};

	this.getMaterial = function(url) {
		$http.get(url).then(function(result) {
			self.materials[url] = result.data;
		});
	};

	self.mediums = {};

	this.getMediums = function() {
		$http.get('http://54.77.217.175/mediums').then(function(result) {
			angular.forEach(result.data.urls, function(url) {
				$http.get(url).then(function(medium) {
					self.mediums[url] = medium.data;
				});
			});
		});
	};
	this.getMediums();

	this.createMaterial = function(mat) {
		return $http.post('http://54.77.217.175/materials', mat);
	};
	this.updateMaterials = function(id, mat) {
		$http.post('http://54.77.217.175/artworks/' + id + '/materials',{url:mat}).then(function(result) {
			console.log(result);
		});
	};
	
	this.deleteMaterials = function(id, mat) {
		$http({
			method:'DELETE',
			url:'http://54.77.217.175/artworks/' + id + '/materials',
			data:{
				url : mat
			}
		}).then(function(result) {
			console.log(result);
		});
	};
});
