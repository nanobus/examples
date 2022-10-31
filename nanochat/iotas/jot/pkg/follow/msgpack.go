// Code generated by @apexlang/codegen. DO NOT EDIT.

package follow

import (
	"github.com/google/uuid"
	"github.com/nanobus/iota/go/msgpack"
	"github.com/nanobus/iota/go/msgpack/convert"
	"time"
)

var _ = convert.Package

type FollowStoreLoadArgs struct {
	UserID uuid.UUID `json:"userId" yaml:"userId" msgpack:"userId"`
}

func (o *FollowStoreLoadArgs) Decode(decoder msgpack.Reader) error {
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
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *FollowStoreLoadArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("userId")
	encoder.WriteString(o.UserID.String())

	return nil
}

type FollowStoreGetMultipleArgs struct {
	UserIds []uuid.UUID `json:"userIds" yaml:"userIds" msgpack:"userIds"`
}

func (o *FollowStoreGetMultipleArgs) Decode(decoder msgpack.Reader) error {
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
		case "userIds":
			listSize, err := decoder.ReadArraySize()
			if err != nil {
				return err
			}
			o.UserIds = make([]uuid.UUID, 0, listSize)
			for listSize > 0 {
				listSize--
				var nonNilItem uuid.UUID
				nonNilItem, err = convert.Parse(uuid.Parse)(decoder.ReadString())
				if err != nil {
					return err
				}
				o.UserIds = append(o.UserIds, nonNilItem)
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

func (o *FollowStoreGetMultipleArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("userIds")
	encoder.WriteArraySize(uint32(len(o.UserIds)))
	for _, v := range o.UserIds {
		encoder.WriteString(v.String())
	}

	return nil
}

type FollowStoreFollowArgs struct {
	FollowedID uuid.UUID `json:"followedId" yaml:"followedId" msgpack:"followedId"`
}

func (o *FollowStoreFollowArgs) Decode(decoder msgpack.Reader) error {
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
		case "followedId":
			o.FollowedID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *FollowStoreFollowArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("followedId")
	encoder.WriteString(o.FollowedID.String())

	return nil
}

type FollowStoreUnfollowArgs struct {
	FollowedID uuid.UUID `json:"followedId" yaml:"followedId" msgpack:"followedId"`
}

func (o *FollowStoreUnfollowArgs) Decode(decoder msgpack.Reader) error {
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
		case "followedId":
			o.FollowedID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *FollowStoreUnfollowArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("followedId")
	encoder.WriteString(o.FollowedID.String())

	return nil
}

type FollowStoreFetchFollowersArgs struct {
	UserID uuid.UUID `json:"userId" yaml:"userId" msgpack:"userId"`
	Offset uint32    `json:"offset" yaml:"offset" msgpack:"offset"`
	Limit  uint32    `json:"limit" yaml:"limit" msgpack:"limit"`
}

func (o *FollowStoreFetchFollowersArgs) Decode(decoder msgpack.Reader) error {
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

func (o *FollowStoreFetchFollowersArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(3)
	encoder.WriteString("userId")
	encoder.WriteString(o.UserID.String())
	encoder.WriteString("offset")
	encoder.WriteUint32(o.Offset)
	encoder.WriteString("limit")
	encoder.WriteUint32(o.Limit)

	return nil
}

type FollowStoreFetchFollowsArgs struct {
	UserID uuid.UUID `json:"userId" yaml:"userId" msgpack:"userId"`
	Offset uint32    `json:"offset" yaml:"offset" msgpack:"offset"`
	Limit  uint32    `json:"limit" yaml:"limit" msgpack:"limit"`
}

func (o *FollowStoreFetchFollowsArgs) Decode(decoder msgpack.Reader) error {
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

func (o *FollowStoreFetchFollowsArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(3)
	encoder.WriteString("userId")
	encoder.WriteString(o.UserID.String())
	encoder.WriteString("offset")
	encoder.WriteUint32(o.Offset)
	encoder.WriteString("limit")
	encoder.WriteUint32(o.Limit)

	return nil
}

func (o *FollowRef) Decode(decoder msgpack.Reader) error {
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

func (o *FollowRef) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(2)
	encoder.WriteString("id")
	encoder.WriteString(o.ID.String())
	encoder.WriteString("time")
	encoder.WriteTime(o.Time)

	return nil
}

func (o *UserRef) Decode(decoder msgpack.Reader) error {
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
		case "followers":
			o.Followers, err = decoder.ReadUint32()
		case "follows":
			o.Follows, err = decoder.ReadUint32()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *UserRef) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(3)
	encoder.WriteString("id")
	encoder.WriteString(o.ID.String())
	encoder.WriteString("followers")
	encoder.WriteUint32(o.Followers)
	encoder.WriteString("follows")
	encoder.WriteUint32(o.Follows)

	return nil
}

func (o *Follow) Decode(decoder msgpack.Reader) error {
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
		case "followedId":
			o.FollowedID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		case "followerId":
			o.FollowerID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
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

func (o *Follow) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(3)
	encoder.WriteString("followedId")
	encoder.WriteString(o.FollowedID.String())
	encoder.WriteString("followerId")
	encoder.WriteString(o.FollowerID.String())
	encoder.WriteString("time")
	encoder.WriteTime(o.Time)

	return nil
}