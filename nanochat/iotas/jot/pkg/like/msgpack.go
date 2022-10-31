// Code generated by @apexlang/codegen. DO NOT EDIT.

package like

import (
	"github.com/google/uuid"
	"github.com/nanobus/iota/go/msgpack"
	"github.com/nanobus/iota/go/msgpack/convert"
)

var _ = convert.Package

type LikeStoreLikeArgs struct {
	LikableID uuid.UUID `json:"likableId" yaml:"likableId" msgpack:"likableId"`
}

func (o *LikeStoreLikeArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "likableId":
			o.LikableID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *LikeStoreLikeArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("likableId")
	encoder.WriteString(o.LikableID.String())

	return nil
}

type LikeStoreUnlikeArgs struct {
	LikableID uuid.UUID `json:"likableId" yaml:"likableId" msgpack:"likableId"`
}

func (o *LikeStoreUnlikeArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "likableId":
			o.LikableID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *LikeStoreUnlikeArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("likableId")
	encoder.WriteString(o.LikableID.String())

	return nil
}

type LikeStoreLoadArgs struct {
	LikableID uuid.UUID `json:"likableId" yaml:"likableId" msgpack:"likableId"`
}

func (o *LikeStoreLoadArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "likableId":
			o.LikableID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *LikeStoreLoadArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("likableId")
	encoder.WriteString(o.LikableID.String())

	return nil
}

type LikeStoreDeleteArgs struct {
	LikableID uuid.UUID `json:"likableId" yaml:"likableId" msgpack:"likableId"`
}

func (o *LikeStoreDeleteArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "likableId":
			o.LikableID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *LikeStoreDeleteArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("likableId")
	encoder.WriteString(o.LikableID.String())

	return nil
}

type LikeStoreGetMultipleArgs struct {
	LikableIds []uuid.UUID `json:"likableIds" yaml:"likableIds" msgpack:"likableIds"`
}

func (o *LikeStoreGetMultipleArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "likableIds":
			listSize, err := decoder.ReadArraySize()
			if err != nil {
				return err
			}
			o.LikableIds = make([]uuid.UUID, 0, listSize)
			for listSize > 0 {
				listSize--
				var nonNilItem uuid.UUID
				nonNilItem, err = convert.Parse(uuid.Parse)(decoder.ReadString())
				if err != nil {
					return err
				}
				o.LikableIds = append(o.LikableIds, nonNilItem)
			}
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *LikeStoreGetMultipleArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("likableIds")
	encoder.WriteArraySize(uint32(len(o.LikableIds)))
	for _, v := range o.LikableIds {
		encoder.WriteString(v.String())
	}

	return nil
}

type LikeStoreGetLikedByArgs struct {
	LikableID uuid.UUID `json:"likableId" yaml:"likableId" msgpack:"likableId"`
	Offset    uint32    `json:"offset" yaml:"offset" msgpack:"offset"`
	Limit     uint32    `json:"limit" yaml:"limit" msgpack:"limit"`
}

func (o *LikeStoreGetLikedByArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "likableId":
			o.LikableID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		case "offset":
			o.Offset, err = decoder.ReadUint32()
		case "limit":
			o.Limit, err = decoder.ReadUint32()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *LikeStoreGetLikedByArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(3)
	encoder.WriteString("likableId")
	encoder.WriteString(o.LikableID.String())
	encoder.WriteString("offset")
	encoder.WriteUint32(o.Offset)
	encoder.WriteString("limit")
	encoder.WriteUint32(o.Limit)

	return nil
}

func (o *LikeRef) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "userId":
			o.UserID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		case "time":
			o.Time, err = decoder.ReadTime()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *LikeRef) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(2)
	encoder.WriteString("userId")
	encoder.WriteString(o.UserID.String())
	encoder.WriteString("time")
	encoder.WriteTime(o.Time)

	return nil
}

func (o *Likable) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "id":
			o.ID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		case "likes":
			o.Likes, err = decoder.ReadUint32()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *Likable) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(2)
	encoder.WriteString("id")
	encoder.WriteString(o.ID.String())
	encoder.WriteString("likes")
	encoder.WriteUint32(o.Likes)

	return nil
}

func (o *Like) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "likableId":
			o.LikableID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		case "userId":
			o.UserID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		case "time":
			o.Time, err = decoder.ReadTime()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *Like) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(3)
	encoder.WriteString("likableId")
	encoder.WriteString(o.LikableID.String())
	encoder.WriteString("userId")
	encoder.WriteString(o.UserID.String())
	encoder.WriteString("time")
	encoder.WriteTime(o.Time)

	return nil
}
