package com.fsa.archive;

import java.lang.reflect.Type;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class AbstractElementAdapter implementsdd JsonSerializer<AbstractElement>,
		JsonDeserializer<AbstractElement> {

	@Override
	public AbstractElement deserialize(JsonElement json, Type typeOfT,
			JsonDeserializationContext context) throws JsonParseException {
		JsonObject jsonObject = json.getAsJsonObject();
		String type = jsonObject.get("type").getAsString();
		JsonElement element = jsonObject.get("properties");

		try {
			return context.deserialize(
					element,
					Class.forName("com.sample.model."
							+ type));
		} catch (ClassNotFoundException cnfe) {
			throw new JsonParseException("Unknown element type: " + type, cnfe);
		}
	}

	@Override
	public JsonElement serialize(AbstractElement src, Type typeOfSrc,
			JsonSerializationContext context) {
		JsonObject result = new JsonObject();
        JsonObject properties = context.serialize(src, src.getClass()).getAsJsonObject();

        if (src instanceof TruncatedElement) {
            result.add("type", new JsonPrimitive(((TruncatedElement) src).getClassName()));
            properties.remove("className");
        } else {
            result.add("type", new JsonPrimitive(src.getClass().getSimpleName()));
        }

        result.add("properties", properties);

        return result;
	}

}
