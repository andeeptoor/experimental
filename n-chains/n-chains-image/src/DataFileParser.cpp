/*
 * DataFileParser.cpp
 *
 *  Created on: Sep 27, 2013
 *      Author: atoor
 */

#include "DataFileParser.h"
#include "iostream"
#include <fstream>

DataFileParser::DataFileParser() {
	// TODO Auto-generated constructor stub

}

DataFileParser::~DataFileParser() {
	// TODO Auto-generated destructor stub
}

void DataFileParser::writeDataToFile(vector<double> data, string filename) {
	ofstream outputFile(filename.c_str());
	outputFile << "{" << endl;
	outputFile << "\"input" << 0 << "\":" << data[0];
	for (int w = 1; w < data.size(); w++) {
		outputFile << "," << endl << "\"input" << w << "\":" << data[w];
	}
	outputFile << endl << "}" << endl;
	outputFile.close();
}

vector<double> DataFileParser::readDataFromFile(string filename) {
	ifstream inputFile(filename.c_str());
	if (!inputFile) {
		cout << "Cannot open data file" << filename << endl;
		exit(0);
	}

	vector<double> data;
	int rowSize;
	while (!inputFile.eof()) {
		double value;
		inputFile.read(reinterpret_cast<char*>(&value), sizeof value);
		if (inputFile.fail()) {
			break;
		}
		data.push_back(value);
	}

	inputFile.close();
	return data;
}

