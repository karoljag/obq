var FileName = $event.fileName.replace(/([^a-zA-Z0-9])/g, "_");

var body = {
	filePath: $event.filePath,
	payload: [
		{
			"fileNamePattern": '^.*$',
			"voucherId": $self.properties().get(FileName).voucherId
		}
	]

};

$integration.importer("voucherImporter", body);