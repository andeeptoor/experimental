/*
 * MatAdapter.cpp
 *
 *  Created on: Sep 25, 2013
 *      Author: atoor
 */

#include "MatAdapter.h"
#include "iostream"
#include "utils.h"

MatAdapter::MatAdapter(int _numberOfColors) {
	numberOfColors = _numberOfColors;
}

MatAdapter::~MatAdapter() {}

Mat MatAdapter::readFileToMat(const string& file, int numberOfColors, int imageDimension) {
	cout << file << endl;
	Mat image;
	if (numberOfColors == 1) {
		image = imread(file, CV_LOAD_IMAGE_GRAYSCALE);
	} else {
		image = imread(file);
	}
	resize(image, image, Size(imageDimension, imageDimension));
	return image;
}

vector<Mat> MatAdapter::readImagesToMats(int imageDimension, char* imageDirectory, char* fileExtension, int numberOfColors) {
	vector<string> files;
	vector<Mat> images;
	utils::recursivelySearchDirectoryForFiles(imageDirectory, fileExtension, &files);
	for (int f = 0; f < files.size(); f++) {
		string file = files[f];
		Mat image = readFileToMat(file, numberOfColors, imageDimension);
		images.push_back(image);
	}
	files.clear();
	return images;
}

vector<vector<double> > MatAdapter::readMatsToData(vector<Mat> images) {
	cout << "Read in [" << images.size() << "] images" << endl;
	vector<vector<double> > inputLayers;
	for (int i = 0; i < images.size(); i++) {
		Mat data = images[i];
		vector<double> inputLayer;
		int index = 0;
		MatConstIterator_<Vec3b> it = data.begin<Vec3b>(), it_end = data.end<Vec3b>();
		for (; it != it_end; ++it) {
			//b=0, g=1, r=2
			for (int c = 0; c < numberOfColors; c++) {
				double value = (*it)[c] / 255.0;
				if (value > 1.0 || value < 0.0) {
					cout << "ERROR on value: " << value << endl;
				}
				inputLayer.push_back(value);
			}
		}

		inputLayers.push_back(inputLayer);
	}
	images.clear();
	return inputLayers;
}

void MatAdapter::writeDataToMat(const vector<double>& output, Mat& test) {
	MatIterator_<Vec3b> it = test.begin<Vec3b>(), it_end = test.end<Vec3b>();
	int outValue = 0;
	for (; it != it_end; ++it) {
		for (int c = 0; c < numberOfColors; c++) {
			(*it)[c] = 255.0 * output[outValue];
			outValue++;
		}
	}
}
