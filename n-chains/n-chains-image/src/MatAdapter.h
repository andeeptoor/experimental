/*
 * MatAdapter.h
 *
 *  Created on: Sep 25, 2013
 *      Author: atoor
 */

#ifndef MATADAPTER_H_
#define MATADAPTER_H_

#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>

using namespace cv;
using namespace std;

class MatAdapter {
public:
	MatAdapter(int _numberOfColors);
	virtual ~MatAdapter();
	vector<vector<double> > readMatsToData(vector<Mat> images);
	void writeDataToMat(const vector<double>& output, Mat& test);
	vector<Mat> readImagesToMats(int imageDimension, char* imageDirectory, char* fileExtension, int numberOfColors);
private:
	int numberOfColors;
};

#endif /* MATADAPTER_H_ */
