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

