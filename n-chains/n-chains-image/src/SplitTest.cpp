#include "iostream"
#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>
#include "utils.h"
#include "MatAdapter.h"
#include "DataFileParser.h"
#include <ctime>
#include <fstream>

using namespace std;
using namespace cv;

void usage() {
	std::cout << " Usage: <imageDirectory> <fileExtension> <imageDimension> <pixelsPerFile> <outputDirectory>" << endl;
}

string createFilename(string outputDirectory, int index, int pieceIndex, string extension) {
	stringstream fileNameStream;
	fileNameStream << outputDirectory << "/out" << index << "-" << pieceIndex << "." << extension;
	return fileNameStream.str();
}

int main(int argc, char *argv[]) {

	clock_t begin = clock();
	if (argc != 6) {
		usage();
		return EXIT_FAILURE;
	}

	char * imageDirectory = argv[1];
	char * fileExtension = argv[2];
	int imageDimension = utils::stringToInt(argv[3]);
	int pixelsPerFile = utils::stringToInt(argv[4]);
	string outputDirectory = argv[5];
	int numberOfColors = 1;
	int numberOfFiles = (imageDimension * imageDimension * numberOfColors) / pixelsPerFile;

	DataFileParser *parser = new DataFileParser();
	MatAdapter *adapter = new MatAdapter(numberOfColors);
	vector<Mat> images = adapter->readImagesToMats(imageDimension, imageDirectory, fileExtension, numberOfColors);
	vector<vector<double> > inputLayers = adapter->readMatsToData(images);
	for (int i = 0; i < inputLayers.size(); i++) {
		vector<double> inputLayer = inputLayers[i];
		Mat test = images[i].clone();
		for (int f = 0; f < numberOfFiles; f++) {
			imwrite(createFilename(outputDirectory, i, f, fileExtension), test);
			string weightFile = createFilename(outputDirectory, i, f, "json");
			cout << "Writing out " << weightFile << endl;
			parser->writeDataToFile(inputLayer, weightFile);
		}
	}

	clock_t end = clock();
	double elapsedSeconds = double(end - begin) / CLOCKS_PER_SEC;
	cout << "Running time: " << elapsedSeconds << "s" << endl;
	return 0;
}
