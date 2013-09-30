/*
 * DataFileParser.h
 *
 *  Created on: Sep 27, 2013
 *      Author: atoor
 */

#ifndef DATAFILEPARSER_H_
#define DATAFILEPARSER_H_

#include <vector>

using namespace std;

class DataFileParser {
public:
	DataFileParser();
	virtual ~DataFileParser();
	void writeDataToFile(vector<double> data, string filename);
	vector<double> readDataFromFile(string filename);
};

#endif /* DATAFILEPARSER_H_ */
